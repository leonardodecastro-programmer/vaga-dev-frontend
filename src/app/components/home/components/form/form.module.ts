import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';
import { LoadingComponent } from '../../../loading/loading.component';

@NgModule({
  declarations: [FormComponent],
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  exports: [FormComponent]
})
export class FormModule { }