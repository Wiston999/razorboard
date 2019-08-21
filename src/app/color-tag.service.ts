import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorTagService {
  private tagSet = {};
  private classPointer = 0;
  private availableClasses = [
    'badge-info',
    'badge-warning',
    'badge-success',
    'badge-danger',
    'badge-primary',
    'badge-secondary',
    'badge-light',
    'badge-dark',
  ];

  getClass(value: string): string {
    if (!this.tagSet[value]) {
      this.tagSet[value] = this.availableClasses[this.classPointer++ % this.availableClasses.length];
    }
    return this.tagSet[value];
  }

  constructor() { }
}
