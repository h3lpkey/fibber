import axios from "axios";
import media from "./modules/media";
import quest from "./modules/quest";
import scene from "./modules/scene";

const token = localStorage.getItem("token") || null;

if (token) {
  axios.defaults.headers.authorization = `Bearer ${token}`;
}

export const request = (url, method, data, headers) => {
  return new Promise((resolve, reject) => {
    return axios({ method, data, url, headers })
      .then((response) => {
        try {
          resolve(response.data);
        } catch {
          resolve(response);
        }
      })
      .catch((error) => {
        try {
          reject(error.response.data);
        } catch {
          reject(error);
        }
      });
  });
};

const API = {
  media,
  quest,
  scene
}

export default API;
