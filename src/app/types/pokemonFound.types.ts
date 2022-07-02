export interface PokemonDetails {
  species: string;
  huntStarted: Date;
  capturedOn: Date;
  count: number;
  foundOnGame: string; // todo add games
  method: 'Full Odds' | 'Shiny Charm' | 'Masuda Method';
}

export interface PokemonData {
  currentHunt: PokemonDetails;
  previousHunts: PokemonDetails[];
}

export interface PokemonFound {
  pokemonSpecies: string;
  encounterCount: number;
}

export type PokemonFoundList = PokemonFound[];


export type pokemonGames =
"Red" | "Green" | "Blue" | "Yellow" |
"Gold" | "Silver" | "Crystal" |
"Ruby" | "Sapphire" | "Emerald" | "Fire Red" | "Leaf Green" |
"Diamond" | "Pearl" | "Platinum" | "HeartGold" | "SoulSilver" |
"Black" | "White" | "Black 2" | "White 2" |
"X" | "Y" | "Omega Ruby" | "Alpha Sapphire" |
"Sun" | "Moon" | "Ultra Sun" | "Ultra Moon" |
"Let's Go Pikachu" | "Let's Go Eevee" | "Sword" | "Shield" |
"Brilliant Diamond" | "Shining Pearl" | "Pokemon Legends Arceus"
