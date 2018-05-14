import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';



import { AppComponent } from './app.component';
import { AnimalesComponent } from './animales/animales.component';
import { AnimalService } from './animal.service';
import { AuthService } from './auth0.service';
import { UserDetailComponent } from './user-detail/user-detail.component';



@NgModule({
    declarations: [
        AppComponent,
        AnimalesComponent,
        UserDetailComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule,
    ],
    providers: [
        AnimalService,
        AuthService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
