import { Observable, take, tap } from "rxjs";

export const getOne = <T>(obs: Observable<T>): T => {
  let value: T;
  obs.pipe(
    take(1),
    tap((v) => value = v)
  ).subscribe();
  return value;
}
