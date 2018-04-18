import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { AnimalesComponent } from './animales/animales.component';
import { AnimalService } from './animal.service';



@NgModule({
    declarations: [
        AppComponent,
        AnimalesComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
    ],
    providers: [
        AnimalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
