import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchToolFormControl = new FormControl('');
  togleTagFormControl = new FormControl('');
  @Output() searchTooEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  changeValue() {
    if (this.searchToolFormControl.value === '') {
      this.searchTooEvent.emit({
        typeQuery: 'tag',
        value: this.searchToolFormControl.value
      });
    }
  }

  changeTogle() {
    if (this.togleTagFormControl.value && this.searchToolFormControl.value !== '') {
      this.searchTooEvent.emit({
        typeQuery: 'tag',
        value: this.searchToolFormControl.value
      });
    } else if (!this.togleTagFormControl.value && this.searchToolFormControl.value !== '') {
      this.searchTooEvent.emit({
        typeQuery: 'tool',
        value: this.searchToolFormControl.value
      });
    }
  }

  sendValueToParent() {
    if (this.togleTagFormControl.value) {
      this.searchTooEvent.emit({
        typeQuery: 'tag',
        value: this.searchToolFormControl.value
      });
    } else {
      this.searchTooEvent.emit({
        typeQuery: 'tool',
        value: this.searchToolFormControl.value
      });
    }
  }

  clearInputSearch() {
    this.togleTagFormControl.setValue(false);
    this.searchToolFormControl.setValue('');
    this.searchTooEvent.emit(this.searchToolFormControl.value);
  }
}
