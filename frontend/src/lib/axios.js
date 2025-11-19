import axios from "axios";

// in production, there's no localhost so we have to make this dynamic
const BASE_URL = "https://loja-site-api.vercel.app/api/v1/products";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;