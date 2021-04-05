import axios from "axios";
import quest from "./modules/quest";

export const request = (url, method, data, headers) => {
  return new Promise((resolve, reject) =>
    axios({ method, data, url, headers })
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
      })
  );
};

export default {
  quest
};
