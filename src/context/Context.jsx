import React, { createContext, useState } from "react";

// Create a Context
export const Context = createContext();

// Create a Provider component
const ContextProvider = ({ children }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isScrolled, setIsScrolled] = React.useState(false);
  return (
    <Context.Provider
      value={{ searchResult, setSearchResult, isScrolled, setIsScrolled }}
    >
      {children}
    </Context.Provider>
  );
};

// Exporting the Context Provider
export default ContextProvider;
