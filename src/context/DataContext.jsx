'use client';

import { createContext, useEffect, useState, useContext } from "react";

export const DataContext = createContext(null);

const formatAddress = (address) => {
    if (address?.length === 42) {
      return address.substring(0, 6) + "..." + address.substring(38);
    } else {
      return address;
    }
}

export const DataProvider = ({ children }) => {
    const [address, setAddress] = useState('');
    const [isConnected, setIsConnected] = useState(false);

    return(
        <DataContext.Provider value={{address, setAddress, isConnected, setIsConnected, formatAddress}}>
            {children}
        </DataContext.Provider>
    );
}