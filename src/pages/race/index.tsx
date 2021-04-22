/**
 * レース一覧ページ
*/

import React from "react"
import { graphql } from "gatsby"
import {
  Heading, 
  HStack, VStack, Box, SimpleGrid,
  Checkbox,
  CheckboxGroup,
  useColorModeValue
} from "@chakra-ui/react"

import Layout from "@/components/layout"
import SEO from "@/components/seo"

import Race from "@/components/parts/race"
import {
  SeasonSelect,
  CouseSelect,
  DistanceSelect
} from "@/components/race/filter"

const frontMatter = {
  title: 'レース',
  description: `ゲームに登場するレース一覧です`
}

const RacePage = ({ data }) => {
  const [season, setSeason] = React.useState(null)
  const [course, setCourse] = React.useState(null)
  const [distance, setDistance] = React.useState(null)

  const filterd = data.allMicrocmsRace.edges.filter(({ node }) => {
    if (!season && !course && !distance) return true
    let is = 0
    if (season) {
      is += node.season.includes(season)
    }
    if (course) {
      is += node.racecourse?.shortName === course
    }
    if (distance) {
      is += node.distanceLabel.includes(distance)
    }
    return is >= (!!season + !!course + !!distance)
  })

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">レース</Heading>

      <HStack mb="2">
        <SeasonSelect season={season} onSeasonChange={setSeason} />
        <CouseSelect course={course} onCourseChange={setCourse} />
        <DistanceSelect distance={distance} onDistanceChange={setDistance} />
      </HStack>

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