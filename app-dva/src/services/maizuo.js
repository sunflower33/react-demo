import axios from 'axios'
export function getCinemaListService() {
  
  return axios.get('./films.json');
}
