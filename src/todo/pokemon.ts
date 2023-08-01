export type PokemonBase = {
  name: string;
  url: string;
};

export type Pokemon = {
  id: number;
  name: PokemonBase['name'];
  sprites: {
    front_default: string;
  };
};
