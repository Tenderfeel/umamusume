/**
 * キャラ一覧ページ
 */
import React from "react"
import { graphql } from "gatsby"
import {
  Heading
} from "@chakra-ui/react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import CharacterList from "../../components/character/character-list"

const frontMatter = {
  title: 'キャラクター',
  description: '現在実装済みの育成ウマ娘一覧'
}

const CharacterPage = ({ data }) => {
  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">キャラクター</Heading>
      <CharacterList characters={data.allMicrocmsCharacter} />
    </Layout>
  )
}

export default CharacterPage

export const query = graphql`
  query {
    allMicrocmsCharacter {
        edges {
          node {
            characterId
            name
            rare
            generation
            birthDay {
              day
              month
            }
            thumbnail {
              url
              height
              width
            }
            primarySurface
            primaryDistance
          }
        }
      }
  }
`