export type ActiveMenuType =
  | 'Home'
  | 'New'
  | 'Selected'
  | 'Previous';

export enum ActiveMenuEnum {
  Home = 'Home',
  New = 'New',
  Current = 'Current',
  Previous = 'Previous',
}

export const allActiveMenu: ActiveMenuType[] = [
  'Home',
  'Selected',
  'New',
  'Previous',
]
export type ActiveMenuStateType = { activeMenu: ActiveMenuType };
