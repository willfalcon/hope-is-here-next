import React, { createContext, useContext } from 'react';

const SiteContext = createContext();

const SiteContextProvider = ({ home, children, data }) => {
  return <SiteContext.Provider value={{ home, ...data }}>{children}</SiteContext.Provider>;
};

const useSiteContext = () => useContext(SiteContext);

export { SiteContextProvider, SiteContext };
export default useSiteContext;
