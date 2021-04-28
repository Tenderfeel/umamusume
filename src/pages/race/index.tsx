/**
 * レース一覧ページ
*/

import React from "react"
import { graphql } from "gatsby"
import {
  Heading, 
  SimpleGrid, VStack, Box, 
  Checkbox,
  CheckboxGroup,
  Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
  useColorModeValue
} from "@chakra-ui/react"

import Layout from "@/components/layout"
import SEO from "@/components/seo"

import Race from "@/components/parts/race"
import {
  SeasonSelect,
  CouseSelect,
  DistanceSelect,
  QualificationSelect,
  GradeSelect
} from "@/components/race/filter"
import NoData from '@/components/parts/nodata'

const frontMatter = {
  title: 'レース',
  description: `ゲームに登場するレース一覧です`
}

const RacePage = ({ data }) => {
  const [season, setSeason] = React.useState(null)
  const [course, setCourse] = React.useState(null)
  const [distance, setDistance] = React.useState(null)
  const [qualification, setQualification] = React.useState(null)
  const [grade, setGrade] = React.useState([])

  const filterd = data.allMicrocmsRace.edges.filter(({ node }) => {
    if (!season && !course && !distance && !qualification && !grade.length) return true
    let is = 0
    if (qualification) {
      is += node.qualification.includes(qualification)
    }
    if (season) {
      is += node.season.includes(season)
    }
    if (course) {
      is += node.racecourse?.shortName === course
    }
    if (distance) {
      is += node.distanceLabel.includes(distance)
    }
    if (grade.length) {
      is += grade.some(g => node.grade.includes(g))
    }
    return is >= (!!season + !!course + !!distance + !!qualification + !!grade.length)
  })

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">レース</Heading>
      <Accordion allowToggle size="sm">
        <AccordionItem mb="2" borderLeftWidth="1px" borderRightWidth="1px">
        <AccordionButton>
          <Box as="h2" flex="1" textAlign="left">
            絞り込み
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <SimpleGrid gap="2" columns={[2, 4]}>
            <QualificationSelect qualification={qualification} onQualificationChange={setQualification} />
            <SeasonSelect season={season} onSeasonChange={setSeason} />
            <CouseSelect course={course} onCourseChange={setCourse} />
            <DistanceSelect distance={distance} onDistanceChange={setDistance} />
          </SimpleGrid>
          
          <GradeSelect grade={grade} onGradeChange={setGrade} />
        </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <VStack spacing={2} align="stretch">
      {filterd.length ? filterd.map(({ node }) => (
          <Race { ...node } key={node.raceId} />
        )) : <NoData />}
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