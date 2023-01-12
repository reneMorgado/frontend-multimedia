import React, { useContext, useState } from "react";
import axios from 'axios'
import './App.css'

import { backURL } from './config'
import { imagesContext } from './context/imagesContext'

import requestImage from "./helpers/requests";

function App() {

  const { uploadedImage, setUploadedImage, imageName, setImageName, images, dispatchImages, requestStarted, setRequestStarted } = useContext(imagesContext)
  const [degrees, setDegrees] = useState(0)
  const [fileName, setFileName] = useState('')

  const onFileChange = (e) => {
    setFileName(e.target.files[0].name)
    setUploadedImage(e.target.files[0])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', uploadedImage)
    const request = await axios.post(`${backURL}user/upload`, formData)
    if (await request?.data?.success) {
      const data = await request.data.uploadedImage
      setImageName(data)
    }
  }

  const makeRequest = async (e) => {
    setRequestStarted(true)
    const response = await requestImage(e.target.value, imageName, degrees)
    setRequestStarted(false)
    dispatchImages({ type: e.target.value, payload: response })
  }

  const resetApp = () => {
    dispatchImages({ type: 'reset' })
    setUploadedImage('')
    setImageName('')
    setRequestStarted(false)
    setFileName('')
  }

  const degreesInput = (e) => {
    if (/^[0-9]+$/.test(e.target.value) || e.target.value === '') {
      if (e.target.value.length <= 3) {
        setDegrees(e.target.value)
      }
    }
  }

  return (
    <div className="container is-fullhd">
      {imageName === '' ? <React.Fragment>
        <section class="hero is-link">
          <div class="hero-body">
            <p class="title">
              Manejo de imágenes con MatLab mediante WebApp
            </p>
            <p class="subtitle">
              Seleccione la imagen a modificar
            </p>
          </div>
        </section>
        <br /><br />
        <div className="container is-flex is-justify-content-center is-align-content-center">
          <form onSubmit={onSubmit}>
            <div class="file has-name is-boxed">
              <label class="file-label">
                <input class="file-input" type="file" name="resume" onChange={onFileChange} />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
                <span class="file-name">
                  {fileName}
                </span>
              </label>
            </div>
            <br />
            <button disabled={uploadedImage === ''} type="submit" class="button is-link is-centered">Subir imagen</button>
            <br />
          </form>
        </div>
      </React.Fragment>
        :
        <React.Fragment>
          <section class="hero is-success">
            <div class="hero-body">
              <p class="title">
                Manejo de imágenes con MatLab mediante WebApp
              </p>
              <p class="subtitle">
                ¿Qué modificación deseas hacer?
              </p>
            </div>
          </section>
          <br /><br />
          <div className="columns is-vcentered is-flex is-justify-content-center is-align-content-center">
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  {!(imageName === '') && <figure class="image is-4by3">
                    <img src={`${backURL}${'results/'+imageName}`} alt="Normal" />
                  </figure>
                  }
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">Imagen Normal</p>
                    </div>
                  </div>
                  <div className="buttons is-flex is-justify-content-center is-align-content-center">
                    <button disabled={requestStarted} onClick={resetApp} class="button is-link is-centered">Subir nueva imagen</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div class="columns is-vcentered is-flex is-justify-content-center is-align-content-center">
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  {!(images.antialiasingImage === '') && <figure class="image is-4by3">
                    <img src={`${backURL}${images.antialiasingImage}`} alt="Antialiasing" />
                  </figure>
                  }
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">Antialiasing</p>
                    </div>
                  </div>
                  <div class="content">
                    Técnica que tiene como objetivo reducir las distorsiones
                  </div>
                  <div className="buttons">
                    <button class="button is-success" disabled={requestStarted || !(images.antialiasingImage === '')} onClick={makeRequest} value={'antialiasing'}>Aplicar</button>
                    <a className={`button is-info ${(requestStarted || (images.antialiasingImage === '')) && 'disable-link'}`} target="_blank" rel="noreferrer" href={`${backURL}${images.antialiasingImage}`} download>Descargar</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  {!(images.rotateImage === '') && <figure class="image is-4by3">
                    <img src={`${backURL}${images.rotateImage}`} alt="Rotate" />
                  </figure>
                  }
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">Rotate</p>
                    </div>
                  </div>
                  <div class="content">
                    Ingrese los grados que desea rotar la imagen
                  </div>
                  <div className="container is-flex">
                    <input class="input is-rounded" type="text" onInput={degreesInput} value={degrees} />
                    <button class="button is-success" disabled={requestStarted} onClick={makeRequest} value={'rotate'}>Aplicar</button>
                    <a className={`button is-info ${(requestStarted || (images.rotateImage === '')) && 'disable-link'}`} target="_blank" rel="noreferrer" href={`${backURL}${images.rotateImage}`} download>Descargar</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  {!(images.togray === '') && <figure class="image is-4by3">
                    <img src={`${backURL}${images.togray}`} alt="GrayScaled" />
                  </figure>
                  }
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">Escala de grises</p>
                    </div>
                  </div>
                  <div class="content">
                    Cambiar la imagen a escala de grises
                  </div>
                  <div className="buttons">
                    <button class="button is-success" disabled={requestStarted || !(images.togray === '')} onClick={makeRequest} value={'togray'}>Aplicar</button>
                    <a className={`button is-info ${(requestStarted || (images.togray === '')) && 'disable-link'}`} target="_blank" rel="noreferrer" href={`${backURL}${images.togray}`} download>Descargar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          {/**********************************/}
          <div class="columns is-vcentered is-flex is-justify-content-center is-align-content-center">
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  {!(images.interpolatereduce === '') && <figure class="image is-4by3">
                    <img src={`${backURL}${images.interpolatereduce}`} alt="Reduced" />
                  </figure>
                  }
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">Reducir con interpolación</p>
                    </div>
                  </div>
                  <div class="content">
                    Reduce el tamaño de la imagen al 55%, esta diferencia se aprecia mejor al descargar la imagen.
                  </div>
                  <div className="buttons">
                    <button class="button is-success" disabled={requestStarted || !(images.interpolatereduce === '')} onClick={makeRequest} value={'interpolatereduce'}>Aplicar</button>
                    <a className={`button is-info ${(requestStarted || (images.interpolatereduce === '')) && 'disable-link'}`} target="_blank" rel="noreferrer" href={`${backURL}${images.interpolatereduce}`} download>Descargar</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  {!(images.interpolateextend === '') && <figure class="image is-4by3">
                    <img src={`${backURL}${images.interpolateextend}`} alt="Extended" />
                  </figure>
                  }
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">Extender con interpolación</p>
                    </div>
                  </div>
                  <div class="content">
                    Aumenta el tamaño de la imagen al 120%, esta diferencia se aprecia mejor al descargar la imagen.
                  </div>
                  <div className="buttons">
                    <button class="button is-success" disabled={requestStarted || !(images.interpolateextend === '')} onClick={makeRequest} value={'interpolateextend'}>Aplicar</button>
                    <a className={`button is-info ${(requestStarted || (images.interpolateextend === '')) && 'disable-link'}`} target="_blank" rel="noreferrer" href={`${backURL}${images.interpolateextend}`} download>Descargar</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">
              <div class="card">
                <div class="card-image">
                  {!(images.invert === '') && <figure class="image is-4by3">
                    <img src={`${backURL}${images.invert}`} alt="Inverted" />
                  </figure>
                  }
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-content">
                      <p class="title is-4">Invertir colores</p>
                    </div>
                  </div>
                  <div class="content">
                    Invertir los colores de la imagen
                  </div>
                  <div className="buttons">
                    <button class="button is-success" disabled={requestStarted || !(images.invert === '')} onClick={makeRequest} value={'invert'}>Aplicar</button>
                    <a className={`button is-info ${(requestStarted || (images.invert === '')) && 'disable-link'}`} target="_blank" rel="noreferrer" href={`${backURL}${images.invert}`} download>Descargar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </React.Fragment>
      }
    </div>
  );
}

export default App;
