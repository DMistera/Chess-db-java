import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) { }

  handleError(error: HttpErrorResponse) {
    this.showError(error.error.error);
  }

  showError(msg: string) {
    this.snackBar.open(msg, 'Close');
  }
}
