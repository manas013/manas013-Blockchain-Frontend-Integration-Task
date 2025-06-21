import { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import CounterABI from '../contracts/Counter.json';
import { ethers } from 'ethers';

const COUNTER_ADDRESS ="0x5FbDB2315678afecb367f032d93F642f64180aa3";

const Counter = () => {
  const { wallet } = useWallet();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);

  // Get current count
const fetchCount = async () => {
  if (!wallet.provider) return;

  try {
    const contract = new ethers.Contract(
      COUNTER_ADDRESS,
      CounterABI.abi,
      wallet.signer || wallet.provider // use signer if available to avoid ENS issues
    );
    const currentCount = await contract.count();
    setCount(Number(currentCount));
  } catch (err) {
    console.error("Fetch count error:", err);
  }
};


  // Handle increment
const handleIncrement = async () => {
  if (!wallet.signer) return;

  try {
    setLoading(true);
    setTxStatus('pending');

    // ✅ Connect contract with signer only
    const signer = wallet.signer;
    const address = await signer.getAddress(); // avoid ENS resolution here
    console.log("Signer address:", address);

    const contract = new ethers.Contract(
      COUNTER_ADDRESS,
      CounterABI.abi,
      signer // don't pass provider only — ENS fails
    );

    const tx = await contract.increment();
    await tx.wait();

    setTxStatus('success');
    fetchCount(); // Refresh count
  } catch (err) {
    console.error("Transaction error:", err);
    setTxStatus('error');
  } finally {
    setLoading(false);
    setTimeout(() => setTxStatus(null), 5000);
  }
};





  useEffect(() => {
    if (wallet.isConnected) fetchCount();
  }, [wallet.isConnected]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Counter Contract</h2>
      
      <div className="text-center mb-6">
        <p className="text-4xl font-bold">{count}</p>
        <p className="text-gray-600">Current Count</p>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={handleIncrement}
          disabled={!wallet.isConnected || loading}
          className={`px-6 py-3 rounded-full font-medium ${
            wallet.isConnected && !loading
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          } transition duration-300`}
        >
          {loading ? 'Processing...' : 'Increment Counter'}
        </button>
      </div>
      
      {txStatus === 'pending' && (
        <p className="mt-4 text-yellow-600 text-center">Transaction pending...</p>
      )}
      {txStatus === 'success' && (
        <p className="mt-4 text-green-600 text-center">
          Transaction successful!
        </p>
      )}
      {txStatus === 'error' && (
        <p className="mt-4 text-red-600 text-center">
          Transaction failed. Check console for details.
        </p>
      )}
      
      {!wallet.isConnected && (
        <p className="mt-4 text-red-500 text-center">
          Connect your wallet to interact
        </p>
      )}
    </div>
  );
};

export default Counter;