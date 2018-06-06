import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { AnimalesComponent } from './animales/animales.component';
import { AnimalService } from './animal.service';
import { AuthService } from './auth0.service';
import { AuthGuard } from './auth-guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NuevoAnimalComponent } from './nuevo-animal/nuevo-animal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { FooterBlackComponent } from './footer-black/footer-black.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordFirstComponent } from './reset-password-first/reset-password-first.component';


const appRoutes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'new-animal', component: NuevoAnimalComponent, canActivate: [AuthGuard] },
  { path: 'animal', component: AnimalesComponent},
  { path: 'animal/detail/:id', component: AnimalDetailComponent },
  { path: 'reset/password', component: ResetPasswordFirstComponent },
  { path: 'new/password/:urldata', component: ResetPasswordComponent },
  //{
    //path: 'heroes',
    //component: HeroListComponent,
    //data: { title: 'Heroes List' }
  //},
  { path: '',
    redirectTo: '/signin',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];



@NgModule({
    declarations: [
        AppComponent,
        AnimalesComponent,
        UserDetailComponent,
        NuevoAnimalComponent,
        HeaderComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        PageNotFoundComponent,
        AnimalDetailComponent,
        FooterBlackComponent,
        ResetPasswordComponent,
        ResetPasswordFirstComponent
    ],
    imports: [
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        ),
        BrowserModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AnimalService,
        AuthService,
        AuthGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
