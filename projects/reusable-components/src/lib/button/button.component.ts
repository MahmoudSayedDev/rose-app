import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

interface LucideIconConfig {
  name: LucideIconData;
  class?: string;
  strokeWidth?: number;
  size?: string;
}

@Component({
  selector: 'lib-button',
  imports: [LucideAngularModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  type = input<'button' | 'submit' | 'reset'>('button');
  form = input<string>('');
  text = input<string>('');
  styleClass = input<string>('');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  isActive = input<boolean>();
  // activeStyle = input<object>();
  activeStyle = input<string>();

  iconPrimeNg = input<string>('');
  iconLucide = input<LucideIconConfig>();

  onClick = output<void>();

  handleClick() {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit();
    }
  }
}
