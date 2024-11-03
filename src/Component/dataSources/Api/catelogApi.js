import axios from 'axios';

const BASE_URL = 'https://api.fastcatalog.ai';

export const catelogListingApi = async ({ limit, offset= 0 }) => {
  const response = await axios.post(`${BASE_URL}/list_catalog_entries?limit=${limit || 10}&offset=${offset}`);
  return response?.data;
};
