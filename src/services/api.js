import Axios from 'axios';

const api_dev = 'https://localhost:5001/api';
const api_prod = 'https://hestiaservicesapi.azurewebsites.net/api/v1';

const api = Axios.create({
	baseURL: api_prod,
});

export default api;
