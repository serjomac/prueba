import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '../material/material.module';
import { TagPipe } from './pipes/tag.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    TagPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    TagPipe,
    HeaderComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SharedModule { }
