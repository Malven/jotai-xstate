import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { selectedPokemonAtom } from '../atoms/selectedPokemon-atom';
import { getPokemons } from '../utils/api';
import { SelectedPokemon } from './todo-selected';
import { TodoListItem } from './toto-list-item';

export const TodoList = () => {
  const selectedPokemon = useAtomValue(selectedPokemonAtom);

  const pokemonQuery = useQuery({
    queryFn: getPokemons,
    queryKey: ['pokemons'],
  });

  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (pokemonQuery.isError) {
    return <div>Error...</div>;
  }

  return (
    <div>
      <SelectedPokemon />
      {pokemonQuery.data?.results.map((pokemon) => (
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
