export type ActiveMenuType =
  | 'Home'
  | 'New'
  | 'Current'
  | 'Previous'
  | 'Editing'
;

export enum ActiveMenuEnum {
  Home = 'Home',
  New = 'New',
  Current = 'Current',
  Previous = 'Previous',
  Editing = 'Editing'
}

export const allActiveMenu: ActiveMenuType[] = [
  'Home',
  'New',
  'Previous',
]
export type ActiveMenuStateType = { activeMenu: ActiveMenuType };
