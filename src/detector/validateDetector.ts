import {
  IDisposable
} from '@lumino/disposable';

export class ValidateDetector implements IDisposable {
  constructor() {
    console.log('ValidateDetector constructor called!');

  }

  public detect() : boolean {
    console.log('Cell executed!');
    // validation logic
    return true;
  }

  get isDisposed(): boolean {
    return this._isDisposed;
  }

  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    this._isDisposed = true;
  }

  private _isDisposed = false;
}