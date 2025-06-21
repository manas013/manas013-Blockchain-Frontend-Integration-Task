import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState({
    address: null,
    isConnected: false,
    network: null,
    provider: null,
    signer: null
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const savedAddress = localStorage.getItem('walletAddress');

        if (savedAddress) {
          try {
            setLoading(true);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const network = await provider.getNetwork();

            setWallet({
              address,
              isConnected: true,
              network: network.chainId,
              provider,
              signer
            });
          } catch (err) {
            console.error("Reconnection failed:", err);
            localStorage.removeItem('walletAddress');
          } finally {
            setLoading(false);
          }
        }
      }
    };

    init();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWallet(prev => ({ ...prev, address: accounts[0] }));
        localStorage.setItem('walletAddress', accounts[0]);
      } else {
        disconnectWallet();
      }
    };

    const handleChainChanged = () => window.location.reload();

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    window.ethereum?.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask not installed.");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      setWallet({
        address,
        isConnected: true,
        network: network.chainId,
        provider,
        signer,
      });

      localStorage.setItem("walletAddress", address);
    } catch (err) {
      setError(err.message);
      console.error("Connection error:", err);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      network: null,
      provider: null,
      signer: null
    });
    localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        error,
        loading,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
