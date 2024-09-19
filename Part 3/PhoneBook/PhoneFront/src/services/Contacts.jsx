import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newContact => {
  return axios.post(baseUrl, newContact)
}

const deleteContactApi = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

const updateContact = (id, updatedContact) => {
  return axios.put(`${baseUrl}/${id}`, updatedContact);
};


export default { 
  getAll: getAll, 
  create: create,
  delete: deleteContactApi,
  update: updateContact
}