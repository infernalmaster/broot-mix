import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const extractData = response => response.data;

export function getAll() {
  return axios.get(`${BASE_URL}/products`).then(extractData);
}
