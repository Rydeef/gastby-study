import React from "react"
import { Link, graphql } from "gatsby"

const CategoryList = ({ pageContext: { category }, data: { allMarkdownRemark } }) => (
  <div>
    <h1>{category} Articles</h1>
    <ul>
      {allMarkdownRemark.edges.map(({ node }) => {
        return (
          <li key={node.frontmatter.title}>
            <Link to={`/article/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link>
            <div>
              <time>{node.frontmatter.date}</time>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
)

export const query = graphql`
  query CategoryListQuery($ids: [String]!) {
    allMarkdownRemark(filter: { id: { in: $ids } }) {
      edges {
        node {
          frontmatter {
            slug
            title
            date(formatString: "MMM D, YYYY")
          }
        }
      }
    }
  }
`

export default CategoryList
