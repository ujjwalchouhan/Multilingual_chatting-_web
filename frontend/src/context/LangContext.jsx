import React, { createContext, useContext, useState } from "react";

export const LangContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLangContext = () => {
    return useContext(LangContext);
};

export const LangContextProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [rec_lang, setrec_Language] = useState("en");

    return <LangContext.Provider value={{ language, setLanguage, rec_lang, setrec_Language }}>{children}</LangContext.Provider>;
};
