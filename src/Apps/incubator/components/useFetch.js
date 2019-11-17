import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  async function fetchUrl() {
    const response = await axios(url);
    setData(response.data);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return data;
};
export { useFetch };
