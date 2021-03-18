/**
 * キャラ一覧ページ
 */
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"

const frontMatter = {
  title: 'キャラクター',
  description: '現在実装済みの育成ウマ娘一覧'
}

const CharacterPage = ({ data }) => (
  <Layout frontMatter={frontMatter}>
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