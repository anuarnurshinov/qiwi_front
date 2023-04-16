import axios from "axios";

export const axiosCLI = axios.create({
  baseURL: "https://nurshinov.ru/",
  timeout: 1000,
});
