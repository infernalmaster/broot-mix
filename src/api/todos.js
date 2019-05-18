import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const extractData = response => response.data;

export function getAll() {
  return axios.get(`${BASE_URL}/todos`).then(extractData);
}

export function create(newItem) {
  return axios.post(`${BASE_URL}/todos`, newItem).then(extractData);
}

export function deleteItem(itemId) {
  return axios.delete(`${BASE_URL}/todos/${itemId}`);
}
