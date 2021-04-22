/**
 * 競馬場詳細ページ
 */

import * as React from "react"
import { graphql } from "gatsby"
import { chakra, Heading, Image, Flex, Box, Text, 
  Link, VisuallyHidden, VStack } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import SectionTitle from "@/components/parts/section-title"
import Race from "@/components/parts/race"

const CourseDetailPage = ({ data: { course, race } }) => {
  console.log(race)
  const frontMatter = {
    title: course?.name || '競馬場',
    description: `${course?.name}の詳細情報`
  }

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Flex 
        align="center" justify="space-between"
        mt="3" mb="6"
      >
        <Heading size="md">{frontMatter.title}</Heading>
        
        <Link href={course.url} isExternal>
          公式サイト<ExternalLinkIcon />
        </Link>
      </Flex>
      
      <chakra.figure sx={{ background: 'gray.100'}}>
        <Image 
          src={course.image?.url} 
          alt="コース" 
          objectFit="contain"
          display="block"
          mr="auto"
          ml="auto"
        />
        <Text fontSize="sm" color="gray.600" p="1" textAlign="right">
          出典：{course.image_cite}
        </Text>
      </chakra.figure>

      <SectionTitle>レース</SectionTitle>
      <VStack spacing={2} align="stretch">
      {
        race.nodes.length ? race.nodes.map((node) => (
          <Race { ...node } key={node.raceId} showSeason={true} />
        )) : <Box borderWidth="1px"
              borderRadius="md"
              p="6"
              textAlign="center"
              color="gray.500"
            >No data</Box>
      }
      </VStack>
    </Layout>
  )
}

export default CourseDetailPage

export const query = graphql`
  query($id: String!, $racecourseId: String!) {
    course: microcmsRacecourse(id: { eq: $id }) {
      racecourseId
      image_cite
      image {
        url
      }
      name
      shortName
      url
    }
    race: allMicrocmsRace(filter: {racecourse: {id: {eq: $racecourseId }}}) {
      nodes {
        raceId
        name
        qualification
        season
        surface
        handed
        grade
        distanceLabel
        distance
        crown
      }
    }
  }
`