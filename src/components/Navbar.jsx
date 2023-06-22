'use client';


import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/context/DataContext';
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/assets/styles/Navbar.module.css'

export default function Navbar() {
    const { address, setAddress } = useContext(DataContext);

    const connectMetamask = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.request({method: "eth_requestAccounts"});
            console.log('Connected to Fantom Network');
            setIsConnected(true);
            let account = await window.ethereum.request({ method: "eth_accounts"});
            setAddress(account[0]);
            getUsername(account[0]);
            console.log(address);
            await handleNetworkSwitch("thetatestnet");
          } catch (error) {
            console.log('Error connecting to Theta Network');
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
            <button onClick={connectMetamask}>
                Connect
            </button>

        </nav>
    )

}