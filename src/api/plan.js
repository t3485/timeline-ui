import axios from 'axios'

export default {
  getPlanList(param) {
    return axios.get('/services/app/PlanService/GetManyPlanWeek', {
      params: param
    })
  }
}