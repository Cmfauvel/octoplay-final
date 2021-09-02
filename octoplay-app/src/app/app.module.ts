import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { environment } from "../environments/environment";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';

//COMPONENTS
import { GameComponent } from './components/games/game/game.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BazarComponent } from './components/bazar/bazar/bazar.component';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { InscriptionFormComponent } from './components/user/inscription-form/inscription-form.component';
import { ProfilUserComponent } from './components/user/profil-user/profil-user.component';
import { RegistrationCompletedComponent } from './components/user/inscription-form/registration-completed/registration-completed.component';
import { PasswordCompletedComponent } from './components/user/profil-user/change-password/password-completed/password-completed.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import { ConnexionFormComponent } from './components/user/connexion-form/connexion-form.component';
import { PanierListComponent } from './components/panier/panier-list/panier-list.component';
import { PanierConfirmComponent } from './components/panier/panier-confirm/panier-confirm.component';
import { PanierFacturationComponent } from './components/panier/panier-facturation/panier-facturation.component';
import { ForgotPasswordComponent } from './components/user/connexion-form/forgot-password/forgot-password.component';
import { EditProfilComponent } from './components/user/profil-user/edit-profil/edit-profil.component';
import { ChangePasswordComponent } from './components/user/profil-user/change-password/change-password.component';
import { HomeComponent } from './components/home/home.component';
import { BazarDetailsComponent } from './components/bazar/bazar/bazar-details/bazar-details.component';
import { DialogNewAddressComponent } from './components/panier/step-address/dialog-new-address/dialog-new-address.component';
import { DialogEditAddressComponent } from './components/panier/step-address/dialog-edit-address/dialog-edit-address.component';
import { DialogNewCardComponent } from './components/panier/panier-facturation/dialog-new-card/dialog-new-card.component';
import { DialogEditCardComponent } from './components/panier/panier-facturation/dialog-edit-card/dialog-edit-card.component';
import { AddressService } from './services/address.service';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { ContactComponent } from './components/contact/contact.component';
import { CookieService } from 'ngx-cookie-service';
import { ButtonAddOrderItemsComponent } from './components/button-add-order-items/button-add-order-items.component';
import { ProductService } from './services/product.service';
import { AuthenticationService } from './services/authentication.service';
import { UploadPictureComponent } from './components/admin/home-admin/upload-picture/upload-picture.component';
import { FooterComponent } from './footer/footer.component';
import { StepAddressComponent } from './components/panier/step-address/step-address.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { DataComponent } from './components/admin/home-admin/data/data.component';
import { UploadProductComponent } from './components/admin/home-admin/upload-product/upload-product.component';
import { UploadCategoryComponent } from './components/admin/home-admin/upload-category/upload-category.component';
import { EditImgComponent } from './components/admin/home-admin/edit-img/edit-img.component';
import { EditProductComponent } from './components/admin/home-admin/edit-product/edit-product.component';
import { EditCategoryComponent } from './components/admin/home-admin/edit-category/edit-category.component';
import { ConfirmComponent } from './_helpers/confirm/confirm.component';
import { OrderService } from './services/order.service';
import { MentionsComponent } from './components/mentions/mentions.component';
import { ConfirmSendComponent } from './components/contact/confirm-send/confirm-send.component';
import { EditOrderComponent } from './components/admin/home-admin/edit-order/edit-order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GameComponent,
    BazarComponent,
    AProposComponent,
    InscriptionFormComponent,
    ProfilUserComponent,
    PanierConfirmComponent,
    RegistrationCompletedComponent,
    PasswordCompletedComponent,
    GameDetailsComponent,
    ConnexionFormComponent,
    PanierListComponent,
    PanierFacturationComponent,
    ForgotPasswordComponent,
    EditProfilComponent,
    ChangePasswordComponent,
    HomeComponent,
    BazarDetailsComponent,
    DialogNewAddressComponent,
    DialogEditAddressComponent,
    DialogNewCardComponent,
    DialogEditCardComponent,
    ContactComponent,
    ButtonAddOrderItemsComponent,
    UploadPictureComponent,
    FooterComponent,
    StepAddressComponent,
    HomeAdminComponent,
    DataComponent,
    UploadProductComponent,
    UploadCategoryComponent,
    EditImgComponent,
    EditProductComponent,
    EditCategoryComponent,
    ConfirmComponent,
    MentionsComponent,
    ConfirmSendComponent,
    EditOrderComponent
  ],

  entryComponents: [DialogNewAddressComponent, DialogEditAddressComponent, EditImgComponent, EditProductComponent, EditCategoryComponent, ConfirmComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCarouselModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ],
  exports: [MatDialogModule],
  providers: [HttpClientModule, CookieService, ProductService, AddressService, AuthenticationService, OrderService, 
    { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
