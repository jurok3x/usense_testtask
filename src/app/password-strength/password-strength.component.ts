import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Strength } from '../enums/strength';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnChanges {

  @Input() password: string = '';

  passwordStrength: Strength = Strength.EMPTY;

  private MIN_PASSWORD_LENGTH: number = 8;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      const newPassword: string = changes['password'].currentValue;
      this.performAction(newPassword);
    }
  }

  performAction(password: string): void {
    if(password.length === 0){
      this.passwordStrength = Strength.EMPTY;
    } else if(password.includes(' ') || password.length < this.MIN_PASSWORD_LENGTH) {
      this.passwordStrength = Strength.ERROR;
    } else if(this.isStrong(password)) {
      this.passwordStrength = Strength.STRONG;
    } else if(this.isMedium(password)) {
      this.passwordStrength = Strength.MEDIUM;
    } else if(this.isWeak(password)) {
      this.passwordStrength = Strength.WEAK;
    }
  }

  getStrengthClass(id: string): string {
    if(this.passwordStrength === Strength.STRONG){
      return 'green';
    }
    if(this.passwordStrength === Strength.MEDIUM){
      if(id === 'first' || id === 'second'){
        return 'yellow';
      }
    };
    if(this.passwordStrength === Strength.WEAK){
      if(id === 'first'){
        return 'red';
      }
    };
    if(this.passwordStrength === Strength.ERROR){
      return 'red';
    };
    return 'gray'
  }

  private isStrong(password: string): boolean {
    return this.containsDigits(password) &&
            this.containsChars(password) &&
            this.containsSymbols(password);
  }

  private isMedium(password: string): boolean {
    return (this.containsDigits(password) && this.containsChars(password)) ||
      (this.containsDigits(password) && this.containsSymbols(password)) ||
      (this.containsChars(password) && this.containsSymbols(password));
  }

  private isWeak(password: string): boolean {
    return this.containsDigits(password) ||
            this.containsChars(password) ||
            this.containsSymbols(password);
  }

  private containsDigits(password: string): boolean {
    const regexp = /\d+/;
    return regexp.test(password);
  }

  private containsChars(password: string): boolean {
    const regexp = /[a-zA-Z]+/;
    return regexp.test(password);
  }

  private containsSymbols(password: string): boolean {
    const regexp = /[!@#$%^&*()_\[\]\-=+\\{}|;:'",.<>?/`~]+/;
    return regexp.test(password);
  }
}
