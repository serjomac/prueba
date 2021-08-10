import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { TagPipe } from './pipes/tag.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    TagPipe,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    TagPipe,
    HeaderComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SharedModule { }
