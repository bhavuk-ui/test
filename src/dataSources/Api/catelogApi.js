import axios from 'axios';

const BASE_URL = 'https://api.fastcatalog.ai';

export const catelogListingApi = async ({ limit, offset= 0, filterData }) => {
  const filterBody = {
    names: [ filterData?.name || '' ],
    modality: [ filterData?.modality || '' ],
    spdx_id: filterData?.spdx_id || '',
    personal_data_type: filterData?.personal_data_type || '',
    data_availability: filterData?.data_availability || ''
  }
  const response = await axios.post(`${BASE_URL}/list_catalog_entries?limit=${limit || 10}&offset=${offset}`, filterBody);
  return response?.data;
};
