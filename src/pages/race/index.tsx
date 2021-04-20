/**
 * レース一覧ページ
*/

import React from "react"
import { graphql } from "gatsby"
import {
  Heading, 
  VStack, Box, SimpleGrid,
  Checkbox,
  CheckboxGroup,
  useColorModeValue
} from "@chakra-ui/react"

import Layout from "@/components/layout"
import SEO from "@/components/seo"

import Race from "@/components/parts/race"
import RaceFilter from "@/components/race/filter"

const frontMatter = {
  title: 'レース',
  description: `ゲームに登場するレース一覧です`
}

const RacePage = ({ data }) => {
  const [selectedTriggers, setSelectedTriggers] = React.useState([])

  const filterd = data.allMicrocmsRace.edges.filter(({ node }) => {
    if (!selectedTriggers.length) return true

  })

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">レース</Heading>

      <RaceFilter mb="2" />

      <VStack spacing={2} align="stretch">
      {filterd.length ? filterd.map(({ node }) => (
          <Race { ...node } key={node.raceId} />
        )) : <Box borderWidth="1px"
              borderRadius="md"
              p="6"
              textAlign="center"
              color="gray.500"
            >No data</Box>}
       </VStack>
    </Layout>
  )
}

export default RacePage

export const query = graphql`
  query {
    allMicrocmsRace {
      edges {
        node {
          name
          grade
          distance
          distanceLabel
          handed
          season
          surface
          raceId
          qualification
          racecourse {
            id
            name
            shortName
          }
          crown
        }
      }
    }
  }
`