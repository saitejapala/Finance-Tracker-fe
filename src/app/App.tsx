import { StoreProvider } from './store/StoreProvider';
import { RouterProvider } from './providers/RouterProvider';

function App() {
  return (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  );
}

export default App;