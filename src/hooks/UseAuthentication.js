import { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { db } from '../firebase/config'

export const useAuthentication = () => {
    const [authError, setAuthError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [cancelled, setCancelled] = useState(false)

    const auth = getAuth()

    const isCancelled = _ => {
        if (cancelled)
            return
    }

    useEffect(() => {
        return _ => setCancelled(true)
    }, [])

    const createUser = async (data) => {
        isCancelled()
        setLoading(true)
        setAuthError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false)

            return user
        } catch (error) {
            let sysErrorMessage;

            if (error.message.includes('password')) {
                sysErrorMessage = 'A senha precisa conter pelo menos 6 caracteres!'
            } else if (error.message.includes('e-email already')) {
                sysErrorMessage = 'E-mail já cadastrado!'
            } else {
                sysErrorMessage = 'Ocorreu um erro, tente novamente!'
            }

            setAuthError(sysErrorMessage)
            setLoading(false)
        }
    }

    const logIn = async (data) => {
        isCancelled()
        setLoading(true)
        setAuthError(null)

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch (error) {
            let sysErrorMessage;

            if (error.message.includes('user not found')) {
                sysErrorMessage = 'Usuário não registrado!'
            } else if (error.message.includes('wrong-passaword')) {
                sysErrorMessage = 'Senha incorreta!'
            } else {
                sysErrorMessage = 'Ocorreu um erro, tente novamente!'
            }

            setAuthError(sysErrorMessage)
            setLoading(false)
        }
    }

    const logOut = _ => {
        isCancelled()

        signOut(auth)
    }

    return {
        auth,
        createUser,
        authError,
        loading,
        logIn,
        logOut
    }
}
