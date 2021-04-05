import React, { ReactElement } from "react";
import "../assets/sass/main.sass";
import Header from "./header";

function Layout({ children }: { children: ReactElement }): ReactElement {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
