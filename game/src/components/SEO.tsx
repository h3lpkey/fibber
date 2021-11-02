/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react";
import { Helmet } from "react-helmet";

function Seo({ lang, title }: { lang: string; title: string }) {
  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
    />
  );
}

export default Seo;
