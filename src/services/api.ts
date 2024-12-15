import axios from 'axios'

export const api = axios.create({
  //baseURL: "http://10.150.56.90:3333",
  baseURL: "http://192.168.1.107:3333",

  timeout: 700,
})