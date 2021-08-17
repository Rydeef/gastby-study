import React from "react";
import { graphql } from "gatsby";

const Article = ({ data: { markdownRemark } }) => (
  <div>
    {console.log(markdownRemark)}
    <h1>{markdownRemark.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
  </div>
);

export const query = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Article;
