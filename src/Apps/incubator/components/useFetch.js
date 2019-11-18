import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
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
export default useFetch;
