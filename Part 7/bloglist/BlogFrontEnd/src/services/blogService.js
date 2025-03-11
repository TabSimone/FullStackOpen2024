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

const increaseLikes = async (id, token) => {
  
  console.log(`Making PUT request to: ${baseUrl}/${id}`);

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    
    // Poiché stiamo solo aggiornando i likes, non dovremmo aver bisogno di inviare altri dati
    const response = await axios.put(
      `${baseUrl}/${id}`, 
      { }, 
      config
    );
    
    console.log('Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error("Errore completo:", error.response || error);
    throw error;
  }
}


const deleteBlog = async (id, token) => {
  
  console.log(`Making DELETE request to: ${baseUrl}/${id}`);

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    }
    
    // Poiché stiamo solo aggiornando i likes, non dovremmo aver bisogno di inviare altri dati
    const response = await axios.delete(
      `${baseUrl}/${id}`, 
      { }, 
      config
    );
    
    console.log('Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error("Errore completo:", error.response || error);
    throw error;
  }
}

export default { getAll, create, update, increaseLikes, deleteBlog }