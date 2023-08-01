import { atom } from 'jotai';
import type { PokemonBase } from '../todo/pokemon';

export const selectedPokemonAtom = atom<PokemonBase | null>(null);
