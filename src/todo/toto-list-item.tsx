import { useSetAtom } from 'jotai';
import { selectedPokemonAtom } from '../atoms/selectedPokemon-atom';
import type { PokemonBase } from './pokemon';

export const TodoListItem = ({ pokemon }: { pokemon: PokemonBase }) => {
  const selectPokemon = useSetAtom(selectedPokemonAtom);

  return (
    <button
      onClick={() => selectPokemon(pokemon)}
      className="p-4 m-2 border border-gray-100 rounded-md hover:bg-slate-700"
      key={pokemon.name}
    >
      {pokemon.name}
    </button>
  );
};
