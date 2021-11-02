/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import React, { ReactElement } from "react";
import "../assets/sass/main.sass";

const Layout = ({ children }: { children: ReactElement[] | ReactElement }) => {
  return <main>{children}</main>;
};

export default Layout;
