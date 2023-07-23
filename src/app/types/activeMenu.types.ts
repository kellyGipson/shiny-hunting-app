export enum ActiveMenuEnum {
  Home = 'Home',
  New = 'New',
  Current = 'Current',
  Previous = 'Previous',
  Editing = 'Editing',
  Settings = 'Settings',
}

export const allActiveMenu: ActiveMenuEnum[] = [
  ActiveMenuEnum.Home,
  ActiveMenuEnum.New,
  ActiveMenuEnum.Previous,
  ActiveMenuEnum.Settings,
]
export type ActiveMenuStateType = { activeMenu: ActiveMenuEnum };
