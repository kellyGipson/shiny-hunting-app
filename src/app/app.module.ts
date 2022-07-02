import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms"
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CounterComponent } from './core/counter/counter.component';
import { NavComponent } from './core/nav/nav.component';
import { PokemonComponent } from './core/pokemon/pokemon.component';

@NgModule({
  declarations: [AppComponent, CounterComponent, NavComponent, PokemonComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
