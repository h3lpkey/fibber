import React, { FC, ReactElement } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PreviewPage from "../pages/preview";
import QuestPage from "pages/quest"
const Router: FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <PreviewPage />
        </Route>{" "}
        <Route path="/quest/:sceneId" exact>
          <QuestPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
