import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUrl = async () => {
      const response = await axios(url);
      setData(response.data);
    };
    fetchUrl();
  }, []);
  return data;
};
export const post = async (json) => {
  const result = await axios.post(
    'https://rudixlab.com/db/',
    JSON.stringify(json),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return new Promise((resolve) => {
    resolve(result);
  });
};
