import Navbar from './components/Navbar';
import Counter from './components/Counter';
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Counter />
        </main>
        
        <footer className="mt-12 py-6 text-center text-gray-500">
          <p>Counter dApp • Ethereum Sepolia Testnet</p>
        </footer>
      </div>
    </WalletProvider>
  );
}

export default App;