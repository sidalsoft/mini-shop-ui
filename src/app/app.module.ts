import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ConfirmComponent } from './confirm/confirm.component';
import { OurInterceptor } from "./interceptor/our-interceptor.service";
import { SpinnerService } from "./services/spinner.service";
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ProductFormComponent,
    ConfirmComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    SpinnerService,
    {provide: HTTP_INTERCEPTORS, useClass: OurInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
