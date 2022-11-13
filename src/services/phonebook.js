import axios from "axios";
const URL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(URL)
    return request.then(response => response.data)
}

const create = (object) => {
    const request = axios.post(URL, object)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${URL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, object) => {
    const request = axios.put(`${URL}/${id}`, object)
    return request.then(response => response.data)
}

export default {getAll, create, remove, update}