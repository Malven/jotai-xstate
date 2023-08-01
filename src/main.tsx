import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';
import { useHydrateAtoms } from 'jotai/react/utils';
import type { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { queryClient } from './utils/queryClient';

const HydrateAtoms = ({ children }: PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return children;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Setup MSW mock server in development
if (process.env.NODE_ENV === 'development') {
  // Certify MSW's Service Worker is available before start React app.
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start();
    }) // Run <App /> when Service Worker is ready to intercept requests.
    .then(() => {
      root.render(
        <ErrorBoundary
          fallback={<div>Something went wrong</div>}
          onError={(e) => console.log(e)}
        >
          <QueryClientProvider client={queryClient}>
            <Provider>
              <HydrateAtoms>
                <App />
              </HydrateAtoms>
            </Provider>
          </QueryClientProvider>
        </ErrorBoundary>,
      );
    });
  // Never setup MSW mock server in production
} else if (process.env.NODE_ENV === 'production') {
  root.render(
    <ErrorBoundary
      fallback={<div>Something went wrong</div>}
      onError={(e) => console.log(e)}
    >
      <QueryClientProvider client={queryClient}>
        <Provider>
          <HydrateAtoms>
            <App />
          </HydrateAtoms>
        </Provider>
      </QueryClientProvider>
    </ErrorBoundary>,
  );
}
