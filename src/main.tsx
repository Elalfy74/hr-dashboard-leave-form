import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryProvider } from './query-provider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
