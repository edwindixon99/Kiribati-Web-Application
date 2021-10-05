import React, {useState, createContext} from 'react';


export const AuthenticationContext = createContext();


export const AuthenticationProvider = props => {
    const [sessionToken, setsessionToken] = useState(null);


    return (
        <AuthenticationContext.Provider value={[sessionToken, setsessionToken]}>
            {props.children}
        </AuthenticationContext.Provider>
    )
}