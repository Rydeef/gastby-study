exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions
  
    // Query markdown files including data from frontmatter
    const {
      data: { allMarkdownRemark },
    } = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              id
              frontmatter {
                categories
                slug
              }
            }
          }
        }
      }
    `)
  
    // Create array of every category without duplicates
    const dedupedCategories = dedupeCategories(allMarkdownRemark)
    // Iterate over categories and create page for each
    dedupedCategories.forEach(category => {
      reporter.info(`Creating page: category/${category}`)
      createPage({
        path: `category/${category}`,
        component: require.resolve("./src/templates/CategoryList.js"),
        // Create props for our CategoryList.js component
        context: {
          category,
          // Create an array of ids of articles in this category
          ids: allMarkdownRemark.edges
            .filter(({ node }) => {
              return node.frontmatter.categories.includes(category)
            })
            .map(({ node }) => node.id),
        },
      })
    })
  
    allMarkdownRemark.edges.forEach(({ node }) => {
      reporter.info(`Creating page: article/${node.frontmatter.slug}`)
      createPage({
        path: `article/${node.frontmatter.slug}`,
        component: require.resolve("./src/templates/Article.js"),
        // Create props for our CategoryList.js component
        context: {
          id: node.id,
        },
      })
    })
  }
  
  function dedupeCategories(allMarkdownRemark) {
    const uniqueCategories = new Set()
    // Iterate over all articles
    allMarkdownRemark.edges.forEach(({ node }) => {
      // Iterate over each category in an article
      node.frontmatter.categories.forEach(category => {
        uniqueCategories.add(category)
      })
    })
    // Create new array with duplicates removed
    return Array.from(uniqueCategories)
  }
  