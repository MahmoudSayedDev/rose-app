import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UserProfile, UpdateProfileRequest } from '../../core/models/user.models';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [FormsModule, ToastModule, TranslatePipe],
  providers: [MessageService],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly translate = inject(TranslateService);

  profile = signal<UserProfile | null>(null);
  isLoading = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  photoPreview = signal<string>('');

  // Editable form fields as signals
  firstName = signal<string>('');
  lastName = signal<string>('');
  phone = signal<string>('');

  hasChanges = computed(() => {
    const p = this.profile();
    if (!p) return false;
    return (
      this.firstName() !== p.firstName ||
      this.lastName() !== p.lastName ||
      this.phone() !== (p.phone ?? '') ||
      this.photoPreview() !== (p.photo ?? '')
    );
  });

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.isLoading.set(true);
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.profile.set(user);
        this.firstName.set(user.firstName);
        this.lastName.set(user.lastName);
        this.phone.set(user.phone ?? '');
        this.photoPreview.set(user.photo ?? '');
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onPhotoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  saveChanges(): void {
    this.isSaving.set(true);
    const body: UpdateProfileRequest = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      phone: this.phone(),
    };
    this.userService.updateProfile(body).subscribe({
      next: (user) => {
        this.profile.set(user);
        this.isSaving.set(false);
        this.messageService.add({
          severity: 'success',
          summary: this.translate.instant('account.toast.success'),
          detail: this.translate.instant('account.toast.profileUpdated'),
        });
      },
      error: () => {
        this.isSaving.set(false);
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('account.toast.error'),
          detail: this.translate.instant('account.toast.profileUpdateFailed'),
        });
      },
    });
  }

  goToChangePassword(): void {
    this.router.navigate(['/account/change-password']);
  }

  deleteAccount(): void {
    if (!confirm(this.translate.instant('account.deleteConfirm'))) return;
    this.userService.deleteAccount().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: this.translate.instant('account.toast.error'),
          detail: this.translate.instant('account.toast.deleteFailed'),
        });
      },
    });
  }
}
