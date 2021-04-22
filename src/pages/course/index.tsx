/**
 * 競馬場一覧ページ
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
import { Link } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"

const frontMatter = {
  title: '競馬場',
  description: `ゲームに登場する競馬場一覧です`
}

const CoursePage = ({ data }) => {

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">競馬場</Heading>

      <VStack spacing={2} align="stretch">
      {
        data.allMicrocmsRacecourse.nodes.map((course) => (
          <Box key={course.racecourseId}>
            <Link to={`/course/${course.racecourseId}`}>
              {course.name}
            </Link>
          </Box>
        ))
      }
        
      </VStack>
    </Layout>
  )
}
export default CoursePage

export const query = graphql`
  query {
    allMicrocmsRacecourse {
      nodes {
        racecourseId
        name
      }
    }
  }
`