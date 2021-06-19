/*
 *
 * HomePage
 *
 */

import React, { memo, useState, useEffect } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import axios from "axios";

const HomePage = () => {
  const [quests, setQuests] = useState([]);
  useEffect(() => {
    axios.get(`${strapi.backendURL}/${pluginId}/get-all-quests`).then(
      (response) => {
        console.log(response.data.data);
        setQuests(response.data.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <p>Тут будет граф со сценами</p>
      <h2>QUESTS:</h2>
      <pre>{JSON.stringify(quests, null, " ")}</pre>
    </div>
  );
};

export default memo(HomePage);
