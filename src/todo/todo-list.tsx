import { useAtomValue } from 'jotai';
import {
  pokemonsAtom,
  pokemonsStatusAtom,
  selectedPokemonAtom,
} from '../atoms/selectedPokemon-atom';
import { SelectedPokemon } from './todo-selected';
import { TodoListItem } from './toto-list-item';

export const TodoList = () => {
  const selectedPokemon = useAtomValue(selectedPokemonAtom);
  const pokemons = useAtomValue(pokemonsAtom);
  const pokemonsStatus = useAtomValue(pokemonsStatusAtom);

  if (pokemonsStatus.isLoading) {
    return <div>Loading...</div>;
  }

  if (pokemonsStatus.isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <SelectedPokemon />
      {pokemons?.results.map((pokemon) => (
        <TodoListItem key={pokemon.name} pokemon={pokemon} />
      ))}
      {selectedPokemon && (
        <div>
          Selected atom value:{' '}
          <pre className="whitespace-pre-line">
            {JSON.stringify(selectedPokemon, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
