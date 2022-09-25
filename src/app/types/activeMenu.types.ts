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
  'Current',
  'New',
  'Previous',
  'Editing'
]
export type ActiveMenuStateType = { activeMenu: ActiveMenuType };
