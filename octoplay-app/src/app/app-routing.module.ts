import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ConnexionFormComponent } from './components/user/connexion-form/connexion-form.component';
import { GameComponent } from './components/games/game/game.component';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { InscriptionFormComponent } from './components/user/inscription-form/inscription-form.component';
import { ProfilUserComponent } from './components/user/profil-user/profil-user.component';
import { PanierListComponent } from './components/panier/panier-list/panier-list.component';
import { PanierFacturationComponent } from './components/panier/panier-facturation/panier-facturation.component';
import { PanierConfirmComponent } from './components/panier/panier-confirm/panier-confirm.component';
import { RegistrationCompletedComponent } from './components/user/inscription-form/registration-completed/registration-completed.component';
import { PasswordCompletedComponent } from './components/user/profil-user/change-password/password-completed/password-completed.component';
import { ForgotPasswordComponent } from './components/user/connexion-form/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/user/profil-user/change-password/change-password.component';
import { EditProfilComponent } from './components/user/profil-user/edit-profil/edit-profil.component';
import { GameDetailsComponent } from './components/games/game-details/game-details.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './_helpers/guards/auth.guard';
import { ContactComponent } from './components/contact/contact.component';
import { StepAddressComponent } from './components/panier/step-address/step-address.component';
import { HomeAdminComponent } from './components/admin/home-admin/home-admin.component';
import { AdminGuard } from './_helpers/guards/admin.guard';
import { ConfirmSendComponent } from './components/contact/confirm-send/confirm-send.component';


const routes: Routes = [{ path: '', component: HomeComponent },
{ path:'checkout', canActivate: [AuthGuard], component: AppComponent },
{ path: 'jeux', component: GameComponent }, { path: 'jeux/:idGame', component: GameDetailsComponent },
{ path: 'connexion', component: ConnexionFormComponent },
{ path: 'a-propos', component: AProposComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'contact/merci', component: ConfirmSendComponent },
{ path: 'inscription', component: InscriptionFormComponent },
{ path: 'profil', component: ProfilUserComponent, canActivate: [AuthGuard] },
{ path: 'panier', component: PanierListComponent, canActivate: [AuthGuard] },
{ path: 'panier/etape1', component: StepAddressComponent, canActivate: [AuthGuard] },
{ path: 'panier/etape1/etape2', component: PanierFacturationComponent, canActivate: [AuthGuard] },
{ path: 'panier/etape1/etape2/etape3', component: PanierConfirmComponent, canActivate: [AuthGuard] },
{ path: 'inscription/merci', component: RegistrationCompletedComponent },
{ path: 'profil/edit', component: EditProfilComponent, canActivate: [AuthGuard] },
{ path: 'connexion/recuperationmdp', component: ForgotPasswordComponent },
{ path: 'profil/changementmdp/confirmation', component: PasswordCompletedComponent },
{ path: 'profil/changementmdp', component: ChangePasswordComponent, canActivate: [AuthGuard] },
{ path: 'admin', component: HomeAdminComponent, canActivate: [AdminGuard] },
{ path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
