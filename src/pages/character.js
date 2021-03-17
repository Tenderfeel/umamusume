/**
 * キャラ一覧ページ
 */
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CharacterPage = ({ data }) => (
  <Layout>
    <SEO title="Characters" />
    <ul>
      {data.allMicrocmsCharacter.edges.map(({ node }) => (
        <li key={node.characterId}>
          <Link to={`/character/${node.characterId}`}>{node.name}</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default CharacterPage

export const query = graphql`
  query {
    allMicrocmsCharacter {
        edges {
          node {
            characterId
            name
            rare
          }
        }
      }
  }
`