'use client';

import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/context/DataContext';
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/assets/styles/Navbar.module.css'

import SearchBar from '@/components/SearchBar'

export default function Navbar() {

    const { address, setAddress, isConnected, setIsConnected, formatAddress } = useContext(DataContext);

    const [error, setError] = useState();

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

    useEffect(() => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on("chainChanged", networkChanged);
        return () => {
          window.ethereum.removeListener("chainChanged", networkChanged);
        };
      }
    }, []);

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
            await handleNetworkSwitch("fantomtestnet");
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
          <div className={styles.navbarContainer + " container"}>
            <div className={styles.content}>
              <div className={styles.logo}>
                <Link href="/" className={styles.logoImg}>
                  <Image
                  src="/imgs/logo.svg"
                  alt='Darkgroove logo'
                  width={180}
                  height={37}
                  priority   
                  />
                </Link>
              </div>
              <div className={styles.center}>
                <ul>
                  <li>
                      <Link href='/explore' className={styles.navLink}>
                          Explore
                      </Link>
                  </li>
                  <li>
                      <Link href='/create' className={styles.navLink}>
                          Create
                      </Link>
                  </li>
                  <li>
                      <Link href='/profile' className={styles.navLink}>
                          Profile
                      </Link>
                  </li>
                </ul>
                <SearchBar />
              </div>
              <div className={styles.right}>
                {isConnected ? (
                  <div className={styles.connectBtn}>
                    <button>
                      {(formatAddress(address))}
                      <Image
                        src="/icons/chevron.svg"
                        alt="Chevron icon"
                        width={40}
                        height={40}
                      />
                    </button>
                    <div className={styles.dropdown}>
                      <Link href="#" onClick={disconnectMetamask} className={styles.dropdownLink}>
                      <Image
                        src="/icons/logout.svg"
                        alt="Logout icon"
                        width={40}
                        height={40}
                      />
                      Disconnect
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className={styles.connectBtn}>
                    <button onClick={connectMetamask}>Connect wallet
                    </button>
                  </div>
                )}
              </div>
              {/* <button className={styles.toggleBtn} type="button" onClick={toggleOpenNavbar} data-open={isNavbarOpen}>
                <div className={styles.tbBar1}></div>
                <div className={styles.tbBar2}></div>
                <div className={styles.tbBar3}></div>
              </button> */}

            </div>

          </div>
            
            
            

        </nav>
    )

}