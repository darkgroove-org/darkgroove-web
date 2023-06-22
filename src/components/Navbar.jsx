'use client';


import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/context/DataContext';
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/assets/styles/Navbar.module.css'

export default function Navbar() {
    const { address, setAddress, isConnected, setIsConnected, formatAddress } = useContext(DataContext);

    const networks = {
        fantomtestnet: {
            chainId: `0x${Number(4002).toString(16)}`,
            chainName: "Fantom Testnet",
            nativeCurrency: {
              name: "FTM",
              symbol: "FTM",
              decimals: 18
            },
            rpcUrls: ["https://rpc.testnet.fantom.network"],
            blockExplorerUrls: ["https://testnet.ftmscan.com/"]
          }
    }

    const changeNetwork = async ({ networkName, setError }) => {
        try {
          if (!window.ethereum) throw new Error("No crypto wallet found");
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...networks[networkName]
              }
            ]
          });
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: networks[networkName].chainId }]
          });
        } catch (err) {
          setError(err.message);
        }
      };

    const handleNetworkSwitch = async (networkName) => {
        setError();
        await changeNetwork({ networkName, setError });
    };
    
    const networkChanged = (chainId) => {
        console.log({ chainId });
    }

    const connectMetamask = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.request({method: "eth_requestAccounts"});
            console.log('Connected to Fantom Network');
            setIsConnected(true);
            let account = await window.ethereum.request({ method: "eth_accounts"});
            setAddress(account[0]);
            // getUsername(account[0]);
            console.log(address);
            // await handleNetworkSwitch("fantomtestnet");
          } catch (error) {
            console.log('Error connecting to Fantom Network');
          }
        } else {
          console.log('Metamask not detected');
        }
      }

      const disconnectMetamask = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log('Disconnected from Fantom Network');
            setIsConnected(false);
            setAddress('');
            setUsername('');
          } catch (error) {
            console.log('Error disconnecting from Fantom Network');
          }
        } else {
          console.log('No Metamask detected');
        }
      }

      const switchNetwork = async () => {
        try {
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{
              chainId: `0x${Number(4002).toString(16)}`,
              chainName: "Fantom Testnet",
              nativeCurrency: {
                name: "FTM",
                symbol: "FTM",
                decimals: 18
              },
              rpcUrls: ["https://rpc.testnet.fantom.network"],
              blockExplorerUrls: ["https://testnet.ftmscan.com/"]
            }],
          });
        } catch (addError) {
          console.log(addError);
        }
      }

    return (
        <nav className={styles.nav}>
            <p>Navbar</p>
            <ul>
                <li>
                    <Link href='/explore'>
                        Explore
                    </Link>
                </li>
                <li>
                    <Link href='/create'>
                        Create
                    </Link>
                </li>
                <li>
                    <Link href='/profile'>
                        Profile
                    </Link>
                </li>
            </ul>
            {isConnected ? (
                <p>{(formatAddress(address))}</p>
            ) : (
                <button onClick={connectMetamask}>
                Connect
            </button>

            )
        }
            

        </nav>
    )

}