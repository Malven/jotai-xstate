import { assign, createMachine } from 'xstate';
import type { PokemonBase } from '../todo/pokemon';
import { getPokemons } from '../utils/api';
export const pokemonsMachine = createMachine({
  context: {
    pokemons: [],
  },
  id: 'pokemons',

  initial: 'loading',

  predictableActionArguments: true,

  schema: {
    context: {} as { pokemons: PokemonBase[] },
    events: {} as { type: 'RETRY' },
  },

  states: {
    error: {
      on: {
        RETRY: 'loading',
      },
    },
    loading: {
      invoke: {
        onDone: {
          actions: assign({ pokemons: (_, event) => event.data.results }),
          target: 'success',
        },
        onError: {
          actions: assign({ pokemons: [] }),
          target: 'error',
        },
        src: () => getPokemons(),
      },
    },
    success: {
      type: 'final',
    },
  },
  /** @xstate-layout N4IgpgJg5mDOIC5QAcD2BrMBbVA7WAdGAE7GrEDEASgKIAqVAmgNoAMAuoiqrAJYAuvPFxAAPRACYANCACeiALQBGAL4qZaTDnwEANqgCGEXrigUIeMARMA3DFc3Y8hfUZNQEt1AGMDgvGzsgSJofP64IuIISgCcABwErABsEgCsMvIIEjFKBAAsqQDMSmlqGvbaLobGphQkZMQEyLp+AGbkWE0VznrV7p64dr7hgcFIIKECQhHjURIA7HmJKelyiKwEqWrqILioEHAh3fhHYdORinF5GYqxCakShXmF81s7jpVEpOSnU8KziDihWWaRuCGUSlyrEez1eZQmxyqblMv3CF3BhSSYKUcSSBBi8ySqRW8I+PVgAFdvN44PBxpM0QCEHklKkQatMoVWGyYtkknE4dsgA */
  tsTypes: {} as import('./pokemonsMachine.typegen').Typegen0,
});
