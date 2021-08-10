import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  messaje = '';
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data !== null) {
      this.messaje = data;
    }
  }

  ngOnInit() {
  }

}
