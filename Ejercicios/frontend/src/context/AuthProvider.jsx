import {useState, useEffect, createContext} from "react";
const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({})

    useEffect(()=>{
        const autenticarUsuario = async ()=>{

        }
        autenticarUsuario
    },[])

    return(
        <AuthContext.Provider
        value={{auth,setAuth}}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext