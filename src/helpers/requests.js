
import Swal from 'sweetalert2'
import axios from 'axios'

import { backURL } from '../config'

const requestOptions = {
  antialiasing: 'antialiasing',
  rotate: 'rotate',
  togray: 'togray',
  interpolatereduce: 'interpolatereduce',
  interpolateextend: 'interpolateextend',
  invert: 'invert'
}

const sendErrorModal = () => {
  Swal.fire({
    icon: 'error',
    title: 'Ocurrió un error',
    text: 'Intenta volver a subir la imagen',
  })
}

const requestImage = async (type, imageName, degrees = 0) => {
  try {
    const request = await axios.post(`${backURL}images/${requestOptions[type]}`, {
      image: imageName,
      degrees: (degrees === '' ? 0 : degrees)
    })
    if (await request?.data?.success) {
      console.log(request.data)
      return request.data.message
    } else {
      sendErrorModal()
      return false
    }
  } catch (error) {
    sendErrorModal()
    return false
  }

}

export default requestImage



