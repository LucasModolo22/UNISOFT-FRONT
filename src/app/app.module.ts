import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './home/pages/pages.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './_services/interceptor/httpLoading.service';
import { DatePipe } from '@angular/common';
import { CurrencyFormatPipe } from './currencyformat/currency-format.pipe';
import { EditProdutosComponent } from './home/pages/edit/produtos/edit.component';
import { EditVendasComponent } from './home/pages/edit/vendas/edit.component';
import { EditRecebimentosComponent } from './home/pages/edit/recebimentos/edit.component';
import { EditUsuariosComponent } from './home/pages/edit/usuarios/edit.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MyValidators } from './validators/myvalidators.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PagesComponent,
    CurrencyFormatPipe,
    EditProdutosComponent,
    EditVendasComponent,
    EditRecebimentosComponent,
    EditUsuariosComponent,
    MyValidators
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CurrencyMaskModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
