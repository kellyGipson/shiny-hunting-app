import { Component, Input } from "@angular/core";
import { oddsMap } from "src/app/types/pokemonFound.types";

@Component({
  selector: 'binomial-dist-progress',
  styleUrls: ['./binomial-dist-progress.component.scss'],
  template: `
    <div class="binomial-dist">
      <p>{{binomialDist()}}% · 1/{{binomialDistFraction()}}</p>
    </div>
  `
})
export class BinomialDistProgress {
  @Input() count: number;
  @Input() game: string;

  private get shinyOdds(): number {
    return oddsMap.get(this.game);
  }

  private get odds(): number {
    return ((1-Math.pow(1-(1/this.shinyOdds), this.count))*100);
  }

  binomialDist(): number {
    if (!this.count || !this.shinyOdds) {
      return 0;
    }
    return Math.round(((1-Math.pow(1-(1/this.shinyOdds), this.count))*100) * 100) / 100;
  }

  binomialDistFraction(): string {
    if (!this.count || !this.shinyOdds) {
      return '1';
    }
    return `${Math.round(((1/(1-(this.odds/100))) + Number.EPSILON) * 100) / 100}`
  }
}
