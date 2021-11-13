import Constructor from "pages/Constructor";
import Game from "pages/Game";
import Media from "pages/Media";
import Quests from "pages/Quests";
import { FC, ReactElement } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router: FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={[`/`, `/quests`, `/deploy`, `/game`]}
          exact={true}
          component={Quests}
        />
        <Route
          path={[`/constructor/:questId`]}
          exact={true}
          component={Constructor}
        />
        <Route path={[`/game/:questId`]} exact={true} component={Game} />
        <Route path={[`/resourses`]} exact={true} component={Media} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
