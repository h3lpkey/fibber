import React from "react";

const styleScene = {
  background: "red"
}

const Scene = (data) => {
  return (
    <div style={styleScene}>
      <h2>Scene:</h2>
      <pre>{JSON.stringify(data, null, " ")}</pre>
    </div>
  );
};

export default Scene;
