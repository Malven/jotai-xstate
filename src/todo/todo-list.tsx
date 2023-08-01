import { useMachine } from '@xstate/react';
import { useAtomValue } from 'jotai';
import { selectedPokemonAtom } from '../atoms/selectedPokemon-atom';
import { pokemonsMachine } from '../machines/pokemonsMachine';
import { SelectedPokemon } from './todo-selected';
import { TodoListItem } from './toto-list-item';

export const TodoList = () => {
  const [state, send] = useMachine(pokemonsMachine, { devTools: true });
  const selectedPokemon = useAtomValue(selectedPokemonAtom);

  if (state.matches('loading')) {
    return <div>Loading...</div>;
  }

  if (state.matches('error')) {
    return (
      <div>
        Error...<button onClick={() => send('RETRY')}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <SelectedPokemon />
      {state.context.pokemons?.map((pokemon) => (
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
