import axios from 'axios'
const baseUrl = '/api/blogs'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async  (newObject, token) => {
  console.log(newObject.title)
  console.log(newObject.author)
  console.log(newObject.url)
  console.log("entered create blog")
  console.log('token is :' +token)
  const config = {
    headers: { Authorization: `Bearer ${token}` }, 
  }


  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, update }