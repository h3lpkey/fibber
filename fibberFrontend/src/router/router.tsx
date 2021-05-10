import React, { FC, ReactElement } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PreviewPage from "pages/Preview";
import QuestPage from "pages/Quest";
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
