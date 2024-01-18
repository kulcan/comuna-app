import { createContext, useEffect, useState } from "react"
import { 
    UserCredential, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "firebase/auth"
import { firebaseAuth } from "../firebase-conf"
import { ILoginUserForm, IRegisterUserForm } from "../interfaces/FormsInterfaces"
import { AppMessages } from "../resources/Constants"

interface IAuthContextProps {
    user: User | null
    loading: boolean
    registerUserEmailPass: (userRegisterForm: IRegisterUserForm) => Promise<UserCredential>
    loginWithEmailPass: (userRegisterForm: ILoginUserForm) => Promise<UserCredential>
    loginWithGoogle: () => void
    loginWithFacebook: () => void
    resetPassword: (email: string) => void
    logout: () => Promise<void>
}

export const AuthContext = createContext<IAuthContextProps>({
    user: null,
    loading: true,
    registerUserEmailPass: async () => { throw new Error(AppMessages.NOT_IMPLEMENTED) },
    loginWithEmailPass: () => { throw new Error(AppMessages.NOT_IMPLEMENTED) },
    loginWithGoogle: () => { throw new Error(AppMessages.NOT_IMPLEMENTED) },
    loginWithFacebook: () => { throw new Error(AppMessages.NOT_IMPLEMENTED) },
    resetPassword: () => { throw new Error(AppMessages.NOT_IMPLEMENTED) },
    logout: () => { throw new Error(AppMessages.NOT_IMPLEMENTED) }
})

interface IAuthContextProviderProps {
    children: any
}

export const AuthContextProvider = ({ children }: IAuthContextProviderProps) => {

    const [user, setUser] = useState<User|null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
    }, [])
    
    const registerUserEmailPass = (userRegisterForm: IRegisterUserForm) => {
        const {email, password} = userRegisterForm
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
    } 

    const loginWithEmailPass = (userRegisterForm: ILoginUserForm) => {
        const {email, password} = userRegisterForm
        return signInWithEmailAndPassword(firebaseAuth, email, password)
    }

    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(firebaseAuth, googleProvider)
    }

    const loginWithFacebook = () => {
        const facebookProvider = new FacebookAuthProvider()
        return signInWithPopup(firebaseAuth, facebookProvider)
    }

    const resetPassword = (email: string) => {
        return sendPasswordResetEmail(firebaseAuth, email);
    }

    const logout = () => {
        return signOut(firebaseAuth)
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            registerUserEmailPass,
            loginWithEmailPass,
            loginWithGoogle,
            loginWithFacebook,
            resetPassword,
            logout,
        }}>
            { children }
        </AuthContext.Provider>
    )
}