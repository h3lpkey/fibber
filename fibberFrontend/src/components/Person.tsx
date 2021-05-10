import React, { ReactElement } from "react";

function Person({ person }: { person: any }): ReactElement {
  console.log("Person", person);
  return <img className="scene-person" src={`http://localhost:1337${person.url}`} alt="" />;
}

export default Person;
