'use client';

import { createContext, useEffect, useState, useContext } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [address, setAddress] = useState('');

    return(
        <DataContext.Provider value={{address, setAddress}}>
            {children}
        </DataContext.Provider>
    );
}