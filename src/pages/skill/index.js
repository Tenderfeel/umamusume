import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const SkillPage = ({ data }) => (
  <Layout>
    <SEO title="スキル" />
    <ul>
      {data.allMicrocmsSkill.edges.map(({ node }) => (
        <li key={node.skillId}>
          <Link to={`/skill/${node.skillId}`}>{node.name}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default SkillPage

export const query = graphql`
  query {
    allMicrocmsSkill {
      edges {
        node {
          uniqe
          trigger
          skillId
          rare
          name
        }
      }
    }
  }
`