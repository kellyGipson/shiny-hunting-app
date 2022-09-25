export type ActiveMenuType =
  | 'Home'
  | 'New'
  | 'Current'
  | 'Previous';

export enum ActiveMenuEnum {
  Home = 'Home',
  New = 'New',
  Current = 'Current',
  Previous = 'Previous',
}

export const allActiveMenu: ActiveMenuType[] = [
  'Home',
  'Current',
  'New',
  'Previous',
]
export type ActiveMenuStateType = { activeMenu: ActiveMenuType };
