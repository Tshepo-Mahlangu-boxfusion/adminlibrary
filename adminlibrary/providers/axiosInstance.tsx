import axios from 'axios';

const token:string | null=localStorage.getItem('Token');
export const instance = axios.create({
    baseURL: '${process.env.NEXT_PUBLIC_PASS}',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });