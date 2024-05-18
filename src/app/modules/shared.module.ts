import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from '../components/blank/blank.component';
import { SectionComponent } from '../components/section/section.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormValidateDirective } from 'form-validate-angular';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BlankComponent,
    SectionComponent,
    FormsModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormValidateDirective
  ],
  exports:[
    CommonModule,
    BlankComponent,
    SectionComponent,
    FormsModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormValidateDirective
  ]
})
export class SharedModule { }
