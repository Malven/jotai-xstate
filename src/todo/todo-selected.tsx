import { useAtomValue } from 'jotai';
import { pokemonAtom, pokemonStatusAtom } from '../atoms/selectedPokemon-atom';

export const SelectedPokemon = () => {
  const selectedPokemon = useAtomValue(pokemonAtom);
  const selectedPokemonStatus = useAtomValue(pokemonStatusAtom);

  if (!selectedPokemon) {
    return <div>No pokemon selected</div>;
  }

  if (selectedPokemonStatus.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center w-1/2 m-auto">
      <div>
        <h1>{selectedPokemon.name}</h1>
      </div>
      <div className="flex justify-center">
        <img
          className="h-48"
          src={selectedPokemon.sprites.front_default}
          alt={selectedPokemon.name}
        />
      </div>
    </div>
  );
};
