import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { allMethods, methodsType } from 'src/app/types/pokemonFound.types';

@Component({
  selector: 'app-method-select',
  templateUrl: './method-select.component.html',
  styleUrls: ['./method-select.component.css', '../../app.component.css']
})
export class MethodSelectComponent implements OnInit {

  methods: methodsType[] = allMethods;

  constructor(
    private readonly _pokemonService: PokemonService,
    private readonly _appService: AppService,
  ) { }

  ngOnInit(): void {
  }

  methodClick(method: methodsType) {
    this._pokemonService.setPokemonCurr({
      ...this._pokemonService.pokemonCurrSource.value,
      method: method,
    });
    this._appService.progressToNextPage();
    this._appService.setActiveMenu('Current');
    this._pokemonService.setPokemonImgUrl(this._pokemonService.pokemonCurrSource.value.species!.toLowerCase()!);
  }

  backButton() {
    this._appService.goBackToLastPage();
  }
}
