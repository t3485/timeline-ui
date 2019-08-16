import axios from 'axios'

export default {
  GetAuthorityTypes() {
    return axios.get('/services/app/TimeAxisService/GetAuthorityTypes')
  },
  GetAssignAuthorityOfUser(p) {
    return axios.get('/services/app/TimeAxisService/GetAssignAuthorityOfUser', {
      params: p
    })
  },
  RemoveAuthority(p) {
    return axios.delete('/services/app/TimeAxisService/RemoveAuthority', {
      params: p
    })
  },
  AssignAuthority(p) {
    return axios.post('/services/app/TimeAxisService/AssignAuthority', p)
  },
  GetAll(p) {
    return axios.get('/services/app/User/GetAll', {
      params: p
    })
  }
}
