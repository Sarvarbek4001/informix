import React, { useState } from "react";

const LocalizationContext = React.createContext();

export const LocalizationContextProvider = (props) => {
  const [lang, setLang] = useState("en");

  return (
    <LocalizationContext.Provider value={{ lang: lang, setLang: setLang }}>
      {props.children}
    </LocalizationContext.Provider>
  );
};

export default LocalizationContext;
