import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from "./app.component";
import { APP_COMPONENTS } from "./core";
import { MATERIAL_COMPONENTS } from "./app.consts";
import { HomeComponent } from './core/home/home.component';
import { StoreModule } from '@ngrx/store';
import { AppReducers } from "./ngrx/app.reducers";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AppComponent,
    APP_COMPONENTS,
    HomeComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MATERIAL_COMPONENTS,
    StoreModule.forRoot(AppReducers),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
