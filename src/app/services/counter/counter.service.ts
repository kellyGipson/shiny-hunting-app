import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  readonly currentCountSource = new BehaviorSubject<number>(this._storageService.getCountFromLocal());
  readonly currentCount: Observable<number> = this.currentCountSource.asObservable();

  readonly intervalSource = new BehaviorSubject<number>(1);
  readonly interval: Observable<number> = this.intervalSource.asObservable();

  constructor(
    private readonly _storageService: StorageService,
  ) { }

  getInterval(): Observable<number> {
    return this.interval;
  }

  setInterval(interval: number): void {
    this.intervalSource.next(interval);
  }

  getCurrentCount(): Observable<number> {
    return this.currentCount;
  }

  setCurrentCount(value: number) {
    this.currentCountSource.next(value);
    this._storageService.setCountToLocal(this.currentCountSource.value);
  }
}
