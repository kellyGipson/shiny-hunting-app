export type methodsType = 'Full Odds' | 'Shiny Charm' | 'Masuda Method';

export const allMethods: methodsType[] = ['Full Odds', 'Shiny Charm', 'Masuda Method'];

export type pokemonGames =
'Gold' | 'Silver' | 'Crystal' |
'Ruby' | 'Sapphire' | 'Emerald' | 'Fire Red' | 'Leaf Green' |
'Diamond' | 'Pearl' | 'Platinum' | 'Heartgold' | 'Soulsilver' |
'Black' | 'White' | 'Black 2' | 'White 2' |
'X' | 'Y' | 'Omega Ruby' | 'Alpha Sapphire' |
'Sun' | 'Moon' | 'Ultra Sun' | 'Ultra Moon' |
"Let's Go Pikachu" | "Let's Go Eevee" | 'Sword' | 'Shield' |
'Brilliant Diamond' | 'Shining Pearl' | 'Legends Arceus'

export const allGames: pokemonGames[] = [
  'Gold', 'Silver', 'Crystal',
  'Ruby', 'Sapphire', 'Emerald', 'Fire Red', 'Leaf Green',
  'Diamond', 'Pearl', 'Platinum', 'Heartgold', 'Soulsilver',
  'Black', 'White', 'Black 2', 'White 2',
  'X', 'Y', 'Omega Ruby', 'Alpha Sapphire',
  'Sun', 'Moon', 'Ultra Sun', 'Ultra Moon',
  "Let's Go Pikachu", "Let's Go Eevee", 'Sword', 'Shield',
  'Brilliant Diamond', 'Shining Pearl', 'Legends Arceus',
]

const _8192games = [
  'Gold', 'Silver', 'Crystal',
  'Ruby', 'Sapphire', 'Emerald', 'Fire Red', 'Leaf Green',
  'Diamond', 'Pearl', 'Platinum', 'Heartgold', 'Soulsilver',
  'Black', 'White', 'Black 2', 'White 2',
];

const _4096games = [
  'X', 'Y', 'Omega Ruby', 'Alpha Sapphire',
  'Sun', 'Moon', 'Ultra Sun', 'Ultra Moon',
  "Let's Go Pikachu", "Let's Go Eevee", 'Sword', 'Shield',
  'Brilliant Diamond', 'Shining Pearl', 'Legends Arceus',
];

export let oddsMap = new Map<string, number>();
_8192games.forEach((game) => {
  oddsMap.set(game, 8192);
});
_4096games.forEach((game) => {
  oddsMap.set(game, 4096);
});

export interface methodImgUrlLookupType {
  gold: number,
  silver: number,
  crystal: number,
  ruby: number,
  sapphire: number,
  emerald: number,
  firered: number,
  leafgreen: number,
  diamond: number,
  pearl: number,
  platinum: number,
  heartgold: number,
  soulsilver: number,
  black: number,
  white: number,
  black2: number,
  white2: number,
  x: number,
  y: number,
  omegaruby: number,
  alphasapphire: number,
  sun: number,
  moon: number,
  ultrasun: number,
  ultramoon: number,
  letsgopikachu: number,
  letsgoeevee: number,
  sword: number,
  shield: number,
  brilliantdiamond: number,
  shiningpearl: number,
  legendsarceus: number,
}

export const methodImgUrlLookup: methodImgUrlLookupType = {
  gold: 8192,
  silver: 8192,
  crystal: 8192,
  ruby: 8192,
  sapphire: 8192,
  emerald: 8192,
  firered: 8192,
  leafgreen: 8192,
  diamond: 8192,
  pearl: 8192,
  platinum: 8192,
  heartgold: 8192,
  soulsilver: 8192,
  black: 8192,
  white: 8192,
  black2: 8192,
  white2: 8192,
  x: 4096,
  y: 4096,
  omegaruby: 4096,
  alphasapphire: 4096,
  sun: 4096,
  moon: 4096,
  ultrasun: 4096,
  ultramoon: 4096,
  letsgopikachu: 4096,
  letsgoeevee: 4096,
  sword: 4096,
  shield: 4096,
  brilliantdiamond: 4096,
  shiningpearl: 4096,
  legendsarceus: 4096,
}

export interface gameImgUrlLookupType {
  gold: string,
  silver: string,
  crystal: string,
  ruby: string,
  sapphire: string,
  emerald: string,
  firered: string,
  leafgreen: string,
  diamond: string,
  pearl: string,
  platinum: string,
  heartgold: string,
  soulsilver: string,
  black: string,
  white: string,
  black2: string,
  white2: string,
  x: string,
  y: string,
  omegaruby: string,
  alphasapphire: string,
  sun: string,
  moon: string,
  ultrasun: string,
  ultramoon: string,
  letsgopikachu: string,
  letsgoeevee: string,
  sword: string,
  shield: string,
  brilliantdiamond: string,
  shiningpearl: string,
  legendsarceus: string
}

export const gameImgUrlLookup: gameImgUrlLookupType = {
  gold: '/assets/game_logos/gold.png',
  silver: '/assets/game_logos/silver.png',
  crystal: '/assets/game_logos/crystal.png',
  ruby: '/assets/game_logos/ruby.png',
  sapphire: '/assets/game_logos/sapphire.png',
  emerald: '/assets/game_logos/emerald.png',
  firered: '/assets/game_logos/firered.png',
  leafgreen: '/assets/game_logos/leafgreen.png',
  diamond: '/assets/game_logos/diamond.png',
  pearl: '/assets/game_logos/pearl.png',
  platinum: '/assets/game_logos/platinum.png',
  heartgold: '/assets/game_logos/heartgold.png',
  soulsilver: '/assets/game_logos/soulsilver.png',
  black: '/assets/game_logos/black.png',
  white: '/assets/game_logos/white.png',
  black2: '/assets/game_logos/black2.png',
  white2: '/assets/game_logos/white2.png',
  x: '/assets/game_logos/x.png',
  y: '/assets/game_logos/y.png',
  omegaruby: '/assets/game_logos/omegaruby.png',
  alphasapphire: '/assets/game_logos/alphasapphire.png',
  sun: '/assets/game_logos/sun.png',
  moon: '/assets/game_logos/moon.png',
  ultrasun: '/assets/game_logos/ultrasun.png',
  ultramoon: '/assets/game_logos/ultramoon.png',
  letsgopikachu: '/assets/game_logos/letsgopikachu.png',
  letsgoeevee: '/assets/game_logos/letsgoeevee.png',
  sword: '/assets/game_logos/sword.png',
  shield: '/assets/game_logos/shield.png',
  brilliantdiamond: '/assets/game_logos/brilliantdiamond.png',
  shiningpearl: '/assets/game_logos/shiningpearl.png',
  legendsarceus:  '/assets/game_logos/legendsarceus.png'
}

export const gameImgUrlLookupProd = {
  gold: '/shiny-hunting-app/assets/game_logos/gold.png',
  silver: '/shiny-hunting-app/assets/game_logos/silver.png',
  crystal: '/shiny-hunting-app/assets/game_logos/crystal.png',
  ruby: '/shiny-hunting-app/assets/game_logos/ruby.png',
  sapphire: '/shiny-hunting-app/assets/game_logos/sapphire.png',
  emerald: '/shiny-hunting-app/assets/game_logos/emerald.png',
  firered: '/shiny-hunting-app/assets/game_logos/firered.png',
  leafgreen: '/shiny-hunting-app/assets/game_logos/leafgreen.png',
  diamond: '/shiny-hunting-app/assets/game_logos/diamond.png',
  pearl: '/shiny-hunting-app/assets/game_logos/pearl.png',
  platinum: '/shiny-hunting-app/assets/game_logos/platinum.png',
  heartgold: '/shiny-hunting-app/assets/game_logos/heartgold.png',
  soulsilver: '/shiny-hunting-app/assets/game_logos/soulsilver.png',
  black: '/shiny-hunting-app/assets/game_logos/black.png',
  white: '/shiny-hunting-app/assets/game_logos/white.png',
  black2: '/shiny-hunting-app/assets/game_logos/black2.png',
  white2: '/shiny-hunting-app/assets/game_logos/white2.png',
  x: '/shiny-hunting-app/assets/game_logos/x.png',
  y: '/shiny-hunting-app/assets/game_logos/y.png',
  omegaruby: '/shiny-hunting-app/assets/game_logos/omegaruby.png',
  alphasapphire: '/shiny-hunting-app/assets/game_logos/alphasapphire.png',
  sun: '/shiny-hunting-app/assets/game_logos/sun.png',
  moon: '/shiny-hunting-app/assets/game_logos/moon.png',
  ultrasun: '/shiny-hunting-app/assets/game_logos/ultrasun.png',
  ultramoon: '/shiny-hunting-app/assets/game_logos/ultramoon.png',
  letsgopikachu: '/shiny-hunting-app/assets/game_logos/letsgopikachu.png',
  letsgoeevee: '/shiny-hunting-app/assets/game_logos/letsgoeevee.png',
  sword: '/shiny-hunting-app/assets/game_logos/sword.png',
  shield: '/shiny-hunting-app/assets/game_logos/shield.png',
  brilliantdiamond: '/shiny-hunting-app/assets/game_logos/brilliantdiamond.png',
  shiningpearl: '/shiny-hunting-app/assets/game_logos/shiningpearl.png',
  legendsarceus: '/shiny-huntingapp /assets/game_logos/legendsarceus.png'
}
