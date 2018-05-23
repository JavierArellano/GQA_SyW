import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { AnimalesComponent } from './animales/animales.component';
import { AnimalService } from './animal.service';
import { AuthService } from './auth0.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NuevoAnimalComponent } from './nuevo-animal/nuevo-animal.component';



@NgModule({
    declarations: [
        AppComponent,
        AnimalesComponent,
        UserDetailComponent,
        NuevoAnimalComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AnimalService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
