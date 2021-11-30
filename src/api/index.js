import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com/";

const api = axios.create({
  baseURL: BASE_URL,
});

const apiRoutes = {
  get: async (route, params) => {
    try {
      const response = await api.get(route, params);
      return response.data;
    } catch (error) {
      return error.response;
    }
  },
};

export default apiRoutes;
