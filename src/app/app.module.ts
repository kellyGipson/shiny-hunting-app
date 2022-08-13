import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms"
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from "./app.component";
import { APP_COMPONENTS } from "./core";
import { MATERIAL_COMPONENTS } from "./app.consts";
import { HomeComponent } from './core/home/home.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MATERIAL_COMPONENTS,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
