import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }


  notify = (message) => {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'right'
    })
  }

  

}

 