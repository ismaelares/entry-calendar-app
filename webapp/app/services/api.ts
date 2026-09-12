import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:65432",
  headers: {
    "Content-Type": "application/json",
  },
});
