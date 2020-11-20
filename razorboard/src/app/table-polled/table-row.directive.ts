import { Directive, ViewContainerRef, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTableRow]'
})
export class TableRowDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) {
  }

}
