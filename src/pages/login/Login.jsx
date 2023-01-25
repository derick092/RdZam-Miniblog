import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/UseAuthentication'

import styles from './Login.module.css'

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { logIn, authError, loading } = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const user = {
      email,
      password
    }

    const res = await logIn(user)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Entre para poder criar as suas postagens</p>
      <form onSubmit={handleSubmit}>
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
        {!loading && <button className='btn'>Entrar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}
