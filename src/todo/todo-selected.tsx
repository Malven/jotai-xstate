import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { selectedPokemonAtom } from '../atoms/selectedPokemon-atom';
import { getPokemon } from '../utils/api';

export const SelectedPokemon = () => {
  const selectPokemon = useAtomValue(selectedPokemonAtom);

  const pokemonQuery = useQuery({
    enabled: !!selectPokemon,
    queryFn: ({ queryKey: [, url] }) => getPokemon(url),
    queryKey: ['pokemon', selectPokemon?.url],
  });

  if (!selectPokemon) {
    return <div>No pokemon selected</div>;
  }

  if (pokemonQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center w-1/2 m-auto">
      <div>
        <h1>{selectPokemon.name}</h1>
      </div>
      <div className="flex justify-center">
        <img
          className="h-48"
          src={pokemonQuery.data?.sprites.front_default}
          alt={selectPokemon.name}
        />
      </div>
    </div>
  );
};
