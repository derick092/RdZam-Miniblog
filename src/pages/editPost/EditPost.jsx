import styles from './EditPost.module.css'

import { useState, useEffect } from 'react'
import { useEditDocument } from '../../hooks/UseEditDocument'
import { useFetchDocument } from '../../hooks/UseFetchDocument'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

export const EditPost = () => {
    const { id } = useParams()

    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState('')

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { editDocument, response } = useEditDocument('posts')
    const { document: post } = useFetchDocument('posts', id)

    useEffect(() => {
        if (post) {
            setBody(post.title)
            setTitle(post.body)
            setImage(post.imag)

            const textTags = post.tags.join(', ')

            setTags(textTags)
        }
    }, [post])


    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')

        try {
            new URL(image)
        } catch (error) {
            setFormError('A imagem precisa ser uma URL.')
        }

        const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

        if (!title || !image || !tags || !body) {
            setFormError('Por favor, preencha todos os campos!')
        }


        if (formError === '') return

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        }

        editDocument(id, data)

        navigate('/dashboard')
    }

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar post</h2>
                    <p>Altere os dados do post</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>T??tulo:</span>
                            <input
                                type='text'
                                name='text'
                                required
                                placeholder='Pense num bom t??tulo...'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                            />
                        </label>
                        <label>
                            <span>URL da imagem:</span>
                            <input
                                type='text'
                                name='image'
                                required
                                placeholder='Insira uma imagem que representa seu post'
                                onChange={(e) => setImage(e.target.value)}
                                value={image}
                            />
                        </label>
                        <p className={styles.preview_title}>Pr??via imagem</p>
                        <img className={styles.image_preview} src={post.image} alt={post.title} />
                        <label>
                            <span>Conte??do:</span>
                            <textarea
                                name='body'
                                required
                                placeholder='Insira o conte??do do post'
                                onChange={(e) => setBody(e.target.value)}
                                value={body}
                            ></textarea>
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input
                                type='text'
                                name='tags'
                                required
                                placeholder='Insira as tags separadas por v??rgula'
                                onChange={(e) => setTags(e.target.value)}
                                value={tags}
                            />
                        </label>
                        {!response.loading && <button className='btn'>Editar</button>}
                        {response.loading && (
                            <button className='btn' disabled>
                                Aguarde.. .
                            </button>
                        )}
                        {(response.error || formError) && (
                            <p className='error'>{response.error || formError}</p>
                        )}
                    </form>
                </>
            )}
        </div>
    )
}