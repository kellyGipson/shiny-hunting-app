import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AppService } from 'src/app/services/app/app.service';
import { CounterService } from 'src/app/services/counter/counter.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { activeMenuType } from 'src/app/types/app.types';

@Component({
  selector: 'app-current-hunt',
  templateUrl: './current-hunt.component.html',
  styleUrls: ['./current-hunt.component.css', '../../app.component.css']
})
export class CurrentHuntComponent implements OnInit, OnDestroy {
  // State
  activeMenu: Observable<activeMenuType> = this._appService.getActiveMenu();

  currentCount: Observable<number> = this._counterService.getCurrentCount();
  interval: Observable<number> = this._counterService.getInterval();

  // Variables
  countAnimation: boolean = false;

  constructor(
    private readonly _appService: AppService,
    private readonly _counterService: CounterService,
    private readonly _storageService: StorageService,
  ) { }

  ngOnInit(): void {
    document.addEventListener('keypress', e => this.onKeypress(e));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keypress', e => this.onKeypress(e));
  }

  onIntervalIncrease(): void {
    const interval = this._counterService.intervalSource.value;
    this._counterService.setInterval(interval + 1);
  }

  onIntervalDecrease(): void {
    const interval = this._counterService.intervalSource.value;
    if (interval > 1 && interval <= Number.MAX_SAFE_INTEGER) {
        this._counterService.setInterval(interval - 1);
    }
  }

  onCounterIncrease(): void {
    this.counterAnimationFn();
    const count = this._counterService.currentCountSource.value;
    const interval = this._counterService.intervalSource.value;
    this._counterService.setCurrentCount(count + interval);
    this._storageService.setCountToLocal(this._counterService.currentCountSource.value);
  }

  onCounterDecrease(): void {
    const count = this._counterService.currentCountSource.value;
    const interval = this._counterService.intervalSource.value;
    if (count !== 0) {
      this.counterAnimationFn();
      this._counterService.setCurrentCount(count - interval);
      this._storageService.setCountToLocal(this._counterService.currentCountSource.value);
    }
  }

  counterAnimationFn(): void {
    this.countAnimation = true;
    setTimeout(() => this.countAnimation = false, 100);
  }

  foundAShiny() {
    this._appService.setActiveMenu('prev');
    this._appService.toggleAddShinyOpen();
    this._counterService.setCurrentCount(0);
    this._storageService.setCountToLocal(this._counterService.currentCountSource.value);
  }

  onResetCounter(): void {
    if (window.confirm("Are you sure you want to reset the counter?")) {
      this._counterService.setCurrentCount(0);
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
