import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null,
}

const editReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'EDITED_DOC':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useEditDocument = (docCollection) => {
    const [response, dispatch] = useReducer(editReducer, initialState)

    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const editDocument = async (id, data) => {
        checkCancelBeforeDispatch({ type: 'LOADING' })

        try {
            const docRef = await doc(db, docCollection, id)

            const updatedDocument = await updateDoc(docRef, data)

            checkCancelBeforeDispatch({
                type: 'EDITED_DOC',
                payload: updatedDocument,
            })
        } catch (error) {
            checkCancelBeforeDispatch({ type: 'ERROR', payload: error.message })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { editDocument, response }
}