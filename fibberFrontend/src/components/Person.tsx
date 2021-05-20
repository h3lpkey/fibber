import React, { ReactElement } from "react";

function Person({ person }: { person: any }): ReactElement {
  const url = process.env.REACT_APP_BACKEND_URL;

  return (
    <div className="scene-person-box">
      <img className={`scene-person`} src={`${url}${person.url}`} alt="" />
    </div>
  );
}

export default Person;
