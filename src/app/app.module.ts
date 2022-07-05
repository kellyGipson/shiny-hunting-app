import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms"
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CurrentHuntComponent } from './core/current-hunt/current-hunt.component';
import { NavComponent } from './core/nav/nav.component';
import { PokemonComponent } from './core/prev-hunt/prev-hunt.component';
import { NewHuntComponent } from './core/new-hunt/new-hunt.component';
import { PokemonSelectComponent } from './core/pokemon-select/pokemon-select.component';
import { GameSelectComponent } from './core/game-select/game-select.component';
import { MethodSelectComponent } from './core/method-select/method-select.component';

@NgModule({
  declarations: [AppComponent, CurrentHuntComponent, NavComponent, PokemonComponent, NewHuntComponent, PokemonSelectComponent, GameSelectComponent, MethodSelectComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
