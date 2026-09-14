import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ToastModule, TranslatePipe],
  providers: [MessageService],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly translate = inject(TranslateService);

  currentPassword = signal<string>('');
  newPassword = signal<string>('');
  confirmPassword = signal<string>('');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  changePassword(): void {
    if (this.newPassword() !== this.confirmPassword()) {
      this.errorMessage.set(
        this.translate.instant('account.changePasswordPage.mismatch')
      );
      return;
    }
    this.errorMessage.set('');
    this.isLoading.set(true);
    this.userService
      .changePassword({
        currentPassword: this.currentPassword(),
        newPassword: this.newPassword(),
        confirmPassword: this.confirmPassword(),
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.messageService.add({
            severity: 'success',
            summary: this.translate.instant('account.toast.success'),
            detail: this.translate.instant('account.toast.passwordChanged'),
          });
          this.router.navigate(['/account']);
        },
        error: () => {
          this.errorMessage.set(
            this.translate.instant('account.toast.passwordChangeFailed')
          );
          this.messageService.add({
            severity: 'error',
            summary: this.translate.instant('account.toast.error'),
            detail: this.translate.instant('account.toast.passwordChangeFailed'),
          });
          this.isLoading.set(false);
        },
      });
  }

  goBack(): void {
    this.router.navigate(['/account']);
  }
}
