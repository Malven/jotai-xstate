import type { Pokemon, PokemonBase } from '../todo/pokemon';

export const getPokemons = async (): Promise<{ results: PokemonBase[] }> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await response.json();
  return data;
};

export const getPokemon = async (url?: string): Promise<Pokemon> => {
  if (!url) throw new Error('url is required');

  const response = await fetch(url);
  const data = await response.json();
  return data;
};
