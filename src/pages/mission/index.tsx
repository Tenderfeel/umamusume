/**
 * 期間限定ミッション一覧ページ
 */
import React from "react"
import { graphql } from "gatsby"
import {
  Heading, 
  HStack, VStack, Box, SimpleGrid,
  Text,Badge,
  useColorModeValue
} from "@chakra-ui/react"
import { Link } from "gatsby"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import moment from "moment"

const frontMatter = {
  title: '限定ミッション',
  description: `期間限定ミッション一覧です`
}

const MissionPage = ({ data }) => {
  return (
     <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">限定ミッション</Heading>

      <VStack spacing={2} align="stretch">
      {
        data.allMicrocmsMission.edges.map(({node}) => {
          // 開催中チェック
          const isBetween = moment().isBetween(node.startDate, node.endDate)
          const textColor = isBetween ?
              useColorModeValue('orange.500', 'yellow.400')
              : useColorModeValue('gray.600', 'gray.600')

          return (
            <Box key={node.missionId}>
              <Link to={`/mission/${node.missionId}`}>
                
                <Text fontWeight="bold" color={textColor}>{node.name}</Text>
                <HStack>
                  { isBetween && <Badge variant="solid" colorScheme="red">
                    開催中!
                  </Badge>}
                  <Text>{moment(node.startDate).format(`YYYY/MM/DD HH:mm`)}</Text>
                  <Text>〜</Text>
                  <Text>{moment(node.endDate).format(`YYYY/MM/DD HH:mm`)}</Text>
                </HStack>
              </Link>
            </Box>
          )
        })
      }
        
      </VStack>
    </Layout>
  )
}

export default MissionPage

export const query = graphql`
  query {
    allMicrocmsMission {
      edges {
        node {
          name
          endDate
          missionId
          startDate
        }
      }
    }
  }
`