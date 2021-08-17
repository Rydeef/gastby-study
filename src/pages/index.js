import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
const IndexPage = () => {
  return (
    <Layout>
      <h1>Category Pages</h1>
      <ul>
        <li>
          <Link to="/category/GatsbyJS">GatsbyJS Articles</Link>
        </li>
        <li>
          <Link to="/category/React">React Articles</Link>
        </li>
      </ul>
    </Layout>
  );
};

export default IndexPage;
