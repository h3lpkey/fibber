import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { ReactElement, useState } from "react";
import Buttons from "./Buttons";
import Controls from "./Controls";
import Text from "./Text";

function Scene({
  scene,
  setSceneById
}: {
  scene: any;
  setSceneById: (id: number) => void;
}): ReactElement {
  const imgBackground = getImage(scene.Background.localFile);
  const imgPerson = getImage(scene.Person.localFile);

  return (
    <div className="scene">
      {imgBackground && (
        <GatsbyImage className="scene-background" image={imgBackground} alt="background" />
      )}
      {imgPerson && (
        <div className="scene-person-box">
          <GatsbyImage className="scene-person" image={imgPerson} alt="person" />
        </div>
      )}
      <Controls>
        <p className="scene-person-name">{scene.PersonName}</p>
        <Text text={scene.Text} />
        <Buttons buttons={scene.Buttons} setSceneById={setSceneById} />
      </Controls>
    </div>
  );
}

export default Scene;
