import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';

import { SharedModule } from './../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddToolComponent } from './components/add-tool/add-tool.component';
@NgModule({
  declarations: [
    HomeComponent,
    AddToolComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddToolComponent]
})
export class HomeModule {

}