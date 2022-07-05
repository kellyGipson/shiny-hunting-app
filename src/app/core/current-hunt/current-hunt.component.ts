import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon, PokemonClient } from 'pokenode-ts';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt, emptyPokemonData } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-current-hunt',
  templateUrl: './current-hunt.component.html',
  styleUrls: ['./current-hunt.component.css', '../../app.component.css']
})
export class CurrentHuntComponent implements OnInit, OnDestroy {
  pokemonApi = new PokemonClient();

  // State
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();
  currentHunt: Observable<CurrentHunt> = this._pokemonService.getPokemonCurr();
  interval: number = 1;

  // Variables
  currentCount!: number | null;
  imageUrl: Observable<string> = this._pokemonService.currImgUrl;
  countAnimation: boolean = false;

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
  ) {}

  async ngOnInit(): Promise<void> {
    document.addEventListener('keypress', e => this.onKeypress(e));
    this._pokemonService.setPokemonImgUrl(this._pokemonService.pokemonCurrSource.value.species!.toLowerCase()!);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', e => this.onKeypress(e));
  }

  onIntervalIncrease(): void {
    this.interval++;
  }

  onIntervalDecrease(): void {
    if (this.interval > 1 && this.interval <= Number.MAX_SAFE_INTEGER) {
        this.interval--;
    }
  }

  onCounterIncrease(): void {
    this.counterAnimationFn();
    const count = this._pokemonService.pokemonCurrSource.value.count! + this.interval;
    this._pokemonService.setPokemonCurr({
      ...this._pokemonService.pokemonCurrSource.value,
      count: count,
    });
  }

  onCounterDecrease(): void {
    let count = this._pokemonService.pokemonCurrSource.value.count;
    if(!(count! - this.interval < 0)) {
      this.counterAnimationFn();
      const count = this._pokemonService.pokemonCurrSource.value.count! - this.interval;
      this._pokemonService.setPokemonCurr({
        ...this._pokemonService.pokemonCurrSource.value,
        count: count,
      });
    }
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  foundAShiny() {
    this._appService.setActiveMenu('Previous');
    // this._pokemonService.setPokemonPrev([
    //   ...this._pokemonService.pokemonPrevSource.value, this._pokemonService.pokemonCurrSource.value
    // ]);
    this._pokemonService.setPokemonCurr({ ...emptyPokemonData.currentHunt, count: 0 });
  }

  onResetCounter(): void {
    if (window.confirm("Are you sure you want to reset the counter?")) {
      this._pokemonService.setPokemonCurr({ ...this._pokemonService.pokemonCurrSource.value, count: 0 });
    }
  }

  onKeypress(e: any): void {
    switch(e.key) {
      case  ' ':
        this.onCounterIncrease();
        return;
      case '0':
        this.onCounterDecrease();
        return;
      case '+':
        this.onIntervalIncrease();
        return;
      case '-':
        this.onIntervalDecrease();
        return;
    }
  }
}
