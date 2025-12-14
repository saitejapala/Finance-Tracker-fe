import { StoreProvider } from './store/StoreProvider'
import { Button } from '@shared/ui/Button/Button'
function App() {
  return (
    <StoreProvider>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-4xl font-bold text-gray-800">Finance App Setup Complete</h1>
        <p className="text-gray-600">FSD Architecture is ready.</p>
        <div className="flex gap-4">
          <Button>Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
        </div>
      </div>
    </StoreProvider>
  )
}
export default App