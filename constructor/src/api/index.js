import axios from "axios";
import auth from "./modules/auth";
import media from "./modules/media";
import quest from "./modules/quest";
import scene from "./modules/scene";

const token = localStorage.getItem("token") || null;

if (token) {
  axios.defaults.headers.authorization = `Bearer ${token}`;
} else {
  console.log("Where my token bro?", localStorage.getItem("token"))
}

const url = window.location.hostname
axios.defaults.baseURL = `http://${url}:1337`;

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
        if (error.response.data.statusCode === 403) {
          localStorage.removeItem("token")
          window.location.replace("http://localhost:3000/auth");
        }
        try {
          reject(error.response.data);
        } catch {
          reject(error);
        }
      });
  });
};

const API = {
  auth,
  media,
  quest,
  scene,
}

export default API;
