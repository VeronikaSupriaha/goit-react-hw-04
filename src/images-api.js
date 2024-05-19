import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const getImages = async (topic, currentPage) => {
  const response = await axios.get('search/photos/', {
    params: {
      query: topic,
      page: currentPage,
      per_page: 12,
      client_id: 'xQT2OlYpHwrFy03mhBr_3CdbFeD16EsVVg7vznWPF6c',
    },
  });
  return response.data.results;
};
