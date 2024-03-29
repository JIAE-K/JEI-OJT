import axios from 'axios';
import { createFakeAPI } from './mock';

const axiosInstance = axios.create();

export const postSignIn = (id:string, password:string) =>
  axiosInstance.post("/sign-in",{id, password})

  createFakeAPI(axiosInstance)  