import { useWallet } from '../context/WalletContext';
import { FaWallet } from 'react-icons/fa';

const Navbar = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  
  const shortenAddress = (addr) => 
    `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Counter dApp</h1>
      
      <div className="flex items-center space-x-4">
        {wallet.network && (
          <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">
            Network: {wallet.network}
          </span>
        )}
        
        {wallet.isConnected ? (
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-green-600 rounded-full flex items-center">
              <FaWallet className="mr-2" />
              {shortenAddress(wallet.address)}
            </span>
            <button 
              onClick={disconnectWallet}
              className="px-3 py-1 bg-red-600 rounded-full hover:bg-red-700 transition"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button 
            onClick={connectWallet}
            className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition flex items-center"
          >
            <FaWallet className="mr-2" />
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;