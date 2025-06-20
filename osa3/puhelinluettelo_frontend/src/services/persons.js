import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const del = (id) => {
    const deleteUrl = `${baseUrl}/${id}`
    console.log(deleteUrl)
    const request = axios.delete(deleteUrl)
    return request.then(response => response.data)
}

export default {
    //getAll: getAll,
    //create: create
    getAll,
    create,
    del
}