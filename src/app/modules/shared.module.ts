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
import { MessagesModule } from 'primeng/messages';
import { FormValidateDirective } from 'form-validate-angular';
import { TrCurrencyPipe } from 'tr-currency';
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
    MessagesModule,
    ButtonModule,
    FormValidateDirective,
    TrCurrencyPipe
  ],
  exports:[
    CommonModule,
    BlankComponent,
    SectionComponent,
    MessagesModule,
    FormsModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
    FormValidateDirective,
    TrCurrencyPipe
  ]
})
export class SharedModule { }
