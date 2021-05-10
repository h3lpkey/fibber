import React, { ReactElement } from "react";
import Background from "./Background";
import Buttons from "./Buttons";
import Controls from "./Controls";
import Music from "./Music";
import Person from "./Person";
import Text from "./Text";

function Scene({ scene }: { scene: any }): ReactElement {
  console.log("Scene", scene);
  return (
    <div className="scene">
      <Background background={scene.Background} />
      <Person person={scene.Person} />
      <Music music={scene.Music} />
      <Controls>
        <p className="scene-person-name">{scene.PersonName}</p>
        <Text text={scene.Text} />
        <Buttons buttons={scene.Buttons} />
      </Controls>
    </div>
  );
}

export default Scene;
