import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordValidationService {

  constructor() { }

  hasUpperCase(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasNumber(password: string): boolean {
    return /\d/.test(password);
  }

  hasSpecialChar(password: string): boolean {
    return /[\W_]/.test(password);
  }

  getPasswordValidationClass(condition: string, password: string): string {
    if (!password) {
      return 'text-gray-600 text-sm mr-2 transition-duration-300';
    }

    const baseClass = 'text-sm mr-2 transition-duration-300';
    const validClass = `text-green-400 pi pi-check ${baseClass}`;
    const invalidClass = `text-red-400 pi pi-times ${baseClass}`;

    switch (condition) {
      case 'hasUpperCase':
        return this.hasUpperCase(password) ? validClass : invalidClass;
      case 'hasNumber':
        return this.hasNumber(password) ? validClass : invalidClass;
      case 'hasSpecialChar':
        return this.hasSpecialChar(password) ? validClass : invalidClass;
      default:
        return `text-gray-600 ${baseClass}`;
    }
  }
}
