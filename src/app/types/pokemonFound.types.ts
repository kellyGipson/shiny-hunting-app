export interface CurrentHunt {
  species: string | null;
  huntStarted: Date | null;
  capturedOn: Date | null;
  count: number | null;
  foundOnGame: string | null; // todo add games
  method: methods | null;
}

export interface PreviousHunt {
  species: string | null;
  huntStarted: Date | null;
  capturedOn: Date | null;
  count: number | null;
  foundOnGame: string | null; // todo add games
  method: methods | null;
}

export interface PokemonDataStorage {
  currentHunt: CurrentHunt;
  previousHunts: PreviousHunts;
}

export type PreviousHunts = CurrentHunt[];

export const emptyPokemonData: PokemonDataStorage = {
  currentHunt: {
    species: null,
    huntStarted: null,
    capturedOn: null,
    count: null,
    foundOnGame: null,
    method: null
  },
  previousHunts: []
}

export type methods = 'Full Odds' | 'Shiny Charm' | 'Masuda Method';

export type pokemonGames =
"Red" | "Green" | "Blue" | "Yellow" |
"Gold" | "Silver" | "Crystal" |
"Ruby" | "Sapphire" | "Emerald" | "Fire Red" | "Leaf Green" |
"Diamond" | "Pearl" | "Platinum" | "Heart Gold" | "Soul Silver" |
"Black" | "White" | "Black 2" | "White 2" |
"X" | "Y" | "Omega Ruby" | "Alpha Sapphire" |
"Sun" | "Moon" | "Ultra Sun" | "Ultra Moon" |
"Let's Go Pikachu" | "Let's Go Eevee" | "Sword" | "Shield" |
"Brilliant Diamond" | "Shining Pearl" | "Legends Arceus"

export const allGames = [
  "Red" , "Green" , "Blue" , "Yellow" ,
  "Gold" , "Silver" , "Crystal" ,
  "Ruby" , "Sapphire" , "Emerald" , "Fire Red" , "Leaf Green" ,
  "Diamond" , "Pearl" , "Platinum" , "Heart Gold" , "Soul Silver" ,
  "Black" , "White" , "Black 2" , "White 2" ,
  "X" , "Y" , "Omega Ruby" , "Alpha Sapphire" ,
  "Sun" , "Moon" , "Ultra Sun" , "Ultra Moon" ,
  "Let's Go Pikachu" , "Let's Go Eevee" , "Sword" , "Shield" ,
  "Brilliant Diamond" , "Shining Pearl" , "Legends Arceus"
]
