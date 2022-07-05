export interface PokemonJSONType {
  name: string;
  url: string;
  games: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
}
