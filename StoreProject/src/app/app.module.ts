import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { MatBadgeModule } from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {MatCardModule} from '@angular/material/card';
import { BrandsCarouselComponent } from './brands-carousel/brands-carousel.component';
import { TopImageComponent } from './top-image/top-image.component';
import { RandomProdsComponent } from './random-prods/random-prods.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SitefooterComponent } from './sitefooter/sitefooter.component';
import {MatDividerModule} from '@angular/material/divider';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { Globals } from './globals'
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartPageComponent } from './cart-page/cart-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MinhasComprasComponent } from './minhas-compras/minhas-compras.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoApi } from './api/produto.api';
import { HistorioComprasApi } from './api/historiocompra.api';
import { UsuarioApi } from './api/user.api';
import { NgxMaskModule, IConfig } from 'ngx-mask'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BrandsCarouselComponent,
    TopImageComponent,
    RandomProdsComponent,
    SitefooterComponent,
    CartButtonComponent,
    LoginComponent,
    CartPageComponent,
    MinhasComprasComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    IvyCarouselModule,
    MatCardModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    MatBadgeModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    
  ],
  providers: [
    Globals,
    ProdutoApi,
    HistorioComprasApi,
    UsuarioApi
  ],
  entryComponents: [
    SitefooterComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
