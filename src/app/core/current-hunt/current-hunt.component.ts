import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pokemon, PokemonClient } from 'pokenode-ts';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { activeMenuType } from 'src/app/types/app.types';
import { CurrentHunt, emptyPokemonData, gameImgUrlLookup, gameImgUrlLookupProd, gameImgUrlLookupType } from 'src/app/types/pokemonFound.types';

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

  readonly gameTyped = this._pokemonService.pokemonCurrSource.value.foundOnGame?.toLowerCase() as keyof typeof gameImgUrlLookup;
  gameImgUrl: string = gameImgUrlLookup[this.gameTyped];

  constructor(
    private readonly _appService: AppService,
    private readonly _pokemonService: PokemonService,
  ) {}

  async ngOnInit(): Promise<void> {
    document.addEventListener('keypress', e => this.onKeypress(e));
    if(this._pokemonService.pokemonCurrSource.value.species !== null) {
      this._pokemonService.setPokemonImgUrl(this._pokemonService.pokemonCurrSource.value.species!.toLowerCase()!);
    }
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

  //{"currentHunt":{"species":"Totodile","huntStarted":"2022-07-06T01:50:32.175Z","capturedOn":null,"count":5451,"foundOnGame":"heartgold","method":"fullodds"},"previousHunts":[{"species":"chikorita","count":330,"foundOnGame":"heartgold","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:50:26.041Z"},{"species":"psyduck","count":4302,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:56.834Z"},{"species":"wooper","count":194,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:41.399Z"},{"species":"bibarel","count":2222,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":null,"capturedOn":"2022-07-06T01:49:30.148Z"},{"species":"quagsire","count":964,"foundOnGame":"brilliantdiamond","method":"fullodds","huntStarted":"2022-07-06T01:47:51.845Z","capturedOn":"2022-07-06T01:49:12.681Z"}]}

  foundAShiny() {
    this._appService.setActiveMenu('Previous');
    this._appService.toggleAddShinyOpen();
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
