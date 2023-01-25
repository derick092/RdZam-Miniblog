import { PostDetail } from '../../components/post/PostDetail'
import { useFetchDocuments } from '../../hooks/UseFetchDocuments'
import { useQuery } from '../../hooks/UseQuery'
import { Link } from 'react-router-dom'

import styles from './Search.module.css'

export const Search = _ => {
    const query = useQuery()
    const search = query.get('q')

    const { documents: posts } = useFetchDocuments('posts', search)


    console.log(posts)
    return (
        <div className={styles.search_container}>
            <h2>Search</h2>
            {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link to='/' className='btn btn-dark'>Voltar</Link>
                </div>
            )}
            {posts && posts.map((post) =>
                <PostDetail key={post.id} post={post} />
            )}
        </div>
    )
}