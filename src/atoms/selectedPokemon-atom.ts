import { atom } from 'jotai';
import { atomsWithQuery } from 'jotai-tanstack-query';
import type { PokemonBase } from '../todo/pokemon';
import { getPokemon, getPokemons } from '../utils/api';

export const selectedPokemonAtom = atom<PokemonBase | null>(null);

export const [pokemonsAtom, pokemonsStatusAtom] = atomsWithQuery(() => ({
  queryFn: async () => getPokemons(),
  queryKey: ['pokemons'],
}));

export const [pokemonAtom, pokemonStatusAtom] = atomsWithQuery((get) => ({
  enabled: get(selectedPokemonAtom) !== null,
  queryFn: async ({ queryKey: [, url] }) => getPokemon(`${url}`),
  queryKey: ['pokemon', get(selectedPokemonAtom)?.url],
}));
