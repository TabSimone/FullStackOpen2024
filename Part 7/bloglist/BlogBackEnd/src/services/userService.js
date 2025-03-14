import axios from 'axios'
const baseUrl = 'api/blogs/:id/comments'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async  (newObject, token) => {
  console.log(newObject.blogId)
  console.log(newObject.text)
  console.log("entered create comment")
  console.log('token is :' +token)
  const config = {
    headers: { Authorization: `Bearer ${token}` }, 
  }


  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}


export default { getAll, create }