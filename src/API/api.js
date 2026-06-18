
//IMPORTS
import axios  from 'axios';
import{baseUrlHandle} from'../utils/baseUrlHandler'

export const api = axios.create({
  //BaseUrl 
  baseURL:baseUrlHandle(),
})

//Interceptor
api.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token")
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});