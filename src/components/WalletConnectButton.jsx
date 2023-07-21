import Image from "next/image";
import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faWallet } from "@fortawesome/free-solid-svg-icons";

const WalletConnectButton = () => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [provider, setProvider] = useState('');
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      setModalVisible(true);
    }
  }
  
  return (
    <div className="inline-flex items-center justify-center">
      
      <button onClick={onClick} disabled={loading} className="my-2 text-base underline bg-transparent rounded-full inline-flex items-center justify-center">
        <FontAwesomeIcon icon={faWallet} className="ml-2 h-10 w-10"/>
      </button>
      <FontAwesomeIcon icon={faCircle} className={`ml-2 h-3 w-3 ${isConnected ? "text-green-500" : "text-red-500"}`} />

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-xs max-h-full text-center overflow-auto">
            <button 
              onClick={() => setModalVisible(false)} 
              className="float-right text-gray-500 hover:text-gray-800"
            >
              Cerrar
            </button>

            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  setProvider(connector.getProvider());
                  setModalVisible(false);
                }}
                className={`mt-4 p-2 w-full bg-blue-600 text-white rounded ${!connector.ready ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {connector.name}
                {!connector.ready && ' (no soportado)'}
                {isLoading && connector.id === pendingConnector?.id && ' (conectando)'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
