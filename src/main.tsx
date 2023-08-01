import { QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import App from './App';
import { queryClient } from './utils/queryClient';

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
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>,
      );
    });
  // Never setup MSW mock server in production
} else if (process.env.NODE_ENV === 'production') {
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
}
