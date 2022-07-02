import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";

interface IPokemonFound {
  pokemonSpecies: string;
  encounterCount: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  activeMenu: "counter" | "pokemon" = "counter";
  countAnimation: boolean = false;

  interval: number = 1;
  currentCount: number = this.getCountFromLocal();
  addShinyOpen: boolean = false;

  pokemonName: FormControl = new FormControl("");
  pokemonEncounters: FormControl = new FormControl(null);

  pokemonFound: IPokemonFound[] = this.getPokemonFoundFromLocal();

  ngOnInit(): void {
    document.addEventListener('keypress', e => this.onKeypress(e));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', e => this.onKeypress(e));
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

  onCounterClick(): void {
    if(this.activeMenu === "pokemon") this.activeMenu = "counter";
  }

  onPokemonClick(): void {
    if(this.activeMenu === "counter") this.activeMenu = "pokemon";
  }

  onIntervalIncrease(): void {
    this.interval++;
  }

  onIntervalDecrease(): void {
    if (this.interval !== 1) {
      this.interval--;
    }
  }

  onCounterIncrease(): void {
    this.counterAnimationFn();
    this.currentCount += this.interval;
    this.setCountToLocal(this.currentCount);
  }

  onCounterDecrease(): void {
    if (this.currentCount !== 0) {
      this.counterAnimationFn();
      this.currentCount -= this.interval;
      this.setCountToLocal(this.currentCount);
    }
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  onResetCounter(): void {
    if (window.confirm("Are you sure you want to reset the counter?")) {
      this.currentCount = 0;
      this.setCountToLocal(this.currentCount);
    }
  }

  onToggleShinyForm(): void {
    this.addShinyOpen = !this.addShinyOpen;
  }

  onShinySubmit(e: Event): void {
    if (e) e.preventDefault();
    this.pokemonFound.push({
      pokemonSpecies: this.pokemonName.value,
      encounterCount: this.pokemonEncounters.value,
    })
    this.setPokemonFoundToLocal(this.pokemonFound);
    this.pokemonName.setValue("");
    this.pokemonEncounters.setValue(null);
  }

  getCountFromLocal(): number {
    if(localStorage.getItem("count") === null) {
      return 0;
    }

    return +localStorage.getItem("count")!;
  }

  setCountToLocal(value: number) {
    this.currentCount = value;
    localStorage.setItem("count", value.toString())
  }

  getPokemonFoundFromLocal(): IPokemonFound[] {
    if(localStorage.getItem("found") === null) {
      return [];
    } else {
      const rawData = localStorage.getItem("found");
      return JSON.parse(rawData!);
    }
  }

  setPokemonFoundToLocal(value: IPokemonFound[]) {
    localStorage.setItem("found", JSON.stringify(value));
  }

  onPokemonDelete(pokemonToDelete: IPokemonFound): void {
    this.pokemonFound = this.pokemonFound.filter(pokemon => pokemon !== pokemonToDelete);
    this.setPokemonFoundToLocal(this.pokemonFound);
  }

  foundAShiny() {
    this.onPokemonClick();
    this.onToggleShinyForm();
    this.pokemonEncounters.setValue(this.currentCount);
    this.setCountToLocal(0);
  }
}
