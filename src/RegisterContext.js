import React, {useState, createContext} from 'react';


export const RegisterContext = createContext();


export const RegisterProvider = props => {
    const [newUser, setUser] = useState(
        {
            'username':'',
            'email':'',
            'idtoken':''
        }
    );


    return (
        <RegisterContext.Provider value={[newUser, setUser]}>
            {props.children}
        </RegisterContext.Provider>
    )
}