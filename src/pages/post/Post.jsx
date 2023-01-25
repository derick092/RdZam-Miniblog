import styles from './Post.module.css'

import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/UseFetchDocument'

export const Post = _ => {
    const { id } = useParams()
    const { document: post, loading } = useFetchDocument('posts', id)

    return (
        <div className={styles.post_container}>
            {loading && <p>Carregand o post...</p>}
            {post && (
                <>
                    <h1>{post.title}</h1>
                    <img src={post.image} alt={post.image} />
                    <p>{post.body}</p>
                    <h3>Este post trata sobre:</h3>
                    <div className={styles.tags}>
                        {post.tags.map(tag =>
                            <p key={tag}><span>#</span>{tag}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}