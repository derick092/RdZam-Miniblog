import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/UseAuthentication'


import styles from './Register.module.css'

export const Register = () => {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const { createUser, authError, loading } = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        const user = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword) {
            setError('As senhas precisam ser iguais!')
            return
        }

        const res = await createUser(user)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className={styles.register}>
            <h1>Registre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas idéias</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome: </span>
                    <input
                        type='text'
                        name='displayName'
                        required
                        placeholder='Nome de usuário'
                        value={displayName}
                        onChange={e => setDisplayName(e.target.value)} />
                </label>
                <label>
                    <span>E-Mail: </span>
                    <input type='email'
                        name='email'
                        required
                        placeholder='E-mail do usuário'
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Senha: </span>
                    <input type='password'
                        name='password'
                        required
                        placeholder='Senha de acesso'
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <span>Senha: </span>
                    <input
                        type='password'
                        name='confirmPassword'
                        required
                        placeholder='Confirme a senha de acesso'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)} />
                </label>
                {!loading && <button className='btn'>Registrar</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}
