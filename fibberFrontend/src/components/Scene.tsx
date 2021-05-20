import React, { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import Background from "./Background";
import Buttons from "./Buttons";
import Controls from "./Controls";
import Person from "./Person";
import Text from "./Text";

function Scene({ setSceneById }: { setSceneById: (id: number) => void }): ReactElement {
  const { scene } = useSelector((state: { quest: any }) => state.quest);

  return (
    <div className="scene">
      {scene.Background && <Background background={scene.Background} />}
      {scene.Person && <Person person={scene.Person} />}
      <Controls>
        <p className="scene-person-name">{scene.PersonName}</p>
        <Text text={scene.Text} />
        <Buttons buttons={scene.Buttons} setSceneById={setSceneById} />
      </Controls>
    </div>
  );
}

export default Scene;
