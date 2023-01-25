import styles from './Home.module.css'

import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/UseFetchDocuments'
import { PostDetail } from '../../components/post/PostDetail'

export const Home = () => {
  const [query, setQuery] = useState('')
  const { documents: posts } = useFetchDocuments('posts')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()

    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>
        Veja os posts mais recentes
      </h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Ou busque por tags...'
          onChange={e => setQuery(e.target.value)} />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div>
        {posts && posts.map((post) =>
          <PostDetail key={post.id} post={post} />
        )}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>
              Não foram encontrados posts
            </p>
            <Link to='/posts/create' className='btn'>Criar</Link>
          </div>
        )}
      </div>
    </div>
  )
}
