import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  // @ts-ignore
  elem: HTMLElement;
  private _showSpinner = false;

  set showSpinner(value: boolean) {
    if (value === this._showSpinner) {
      return;
    }
    this._showSpinner = value;
    if (this.elem) {
      this.elem.style.visibility = value ? 'visible' : 'hidden';
    }
  }
}
