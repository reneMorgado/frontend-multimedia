import { useReducer, useState } from "react"
import React from 'react'

export const imagesContext = React.createContext(null)

const ImagesContextProvider = ({ children }) => {

    const initialStateImages = {
        antialiasingImage: '',
        rotateImage: '',
        togray: '',
        interpolatereduce: '',
        interpolateextend: '',
        invert: ''
    }

    const reducerImages = (state, action) => {
        switch (action.type) {
            case 'antialiasing':
                return { ...state, antialiasingImage: action.payload }
            case 'rotate':
                return { ...state, rotateImage: action.payload }
            case 'togray':
                return { ...state, togray: action.payload }
            case 'interpolatereduce':
                return { ...state, interpolatereduce: action.payload }
            case 'interpolateextend':
                return { ...state, interpolateextend: action.payload }
            case 'invert':
                return { ...state, invert: action.payload }
            case 'reset':
                return { ...state, ...initialStateImages }
            default:
                break;
        }
    }

    const [images, dispatchImages] = useReducer(reducerImages, initialStateImages)

    const [requestStarted, setRequestStarted] = useState(false)

    // Uploads
    const [uploadedImage, setUploadedImage] = useState('')
    const [imageName, setImageName] = useState('')

    return (
        <imagesContext.Provider value={{ uploadedImage, setUploadedImage, imageName, setImageName, requestStarted, setRequestStarted, images, dispatchImages }}>
            {children}
        </imagesContext.Provider>
    )
}

export default ImagesContextProvider