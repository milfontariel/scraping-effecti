import { createContext, useState } from "react";

const MainContext = createContext();

export function MainProvider({ children }) {
    const [biddings, setBiddings] = useState([]);
    return (
        <MainContext.Provider value={{
            biddings, setBiddings
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;