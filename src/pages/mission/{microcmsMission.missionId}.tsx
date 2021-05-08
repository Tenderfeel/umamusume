/**
 * 限定ミッション詳細ページ
 */
import React from "react"
import { graphql } from "gatsby"
import { Image, Flex, Box, Text, Tag,
  Tooltip, SimpleGrid, Badge,
  Heading, HStack, VStack, StackDivider,
  useColorModeValue } from "@chakra-ui/react"
import moment from "moment"
import SEO from "../../components/seo"
import Layout from "../../components/layout"
import Race from "@/components/parts/race"


const MissionDetailPage = ({ data: { mission } }) => {
  
  const frontMatter = {
    title: mission.name || 'ミッション',
    description: `ミッション「${mission.name}」の詳細情報`
  }
  const isBetween = moment().isBetween(mission.startDate, mission.endDate)

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <VStack 
        mt="3" mb="6" align="start"
      >
        <Heading size="md">
          【{ mission.prefix }】{mission.name}
        </Heading>
        <HStack>
          { isBetween && <Badge variant="solid" colorScheme="red">
            開催中!
          </Badge>}
          <Text>{moment(mission.startDate).format(`YYYY/MM/DD HH:mm`)}</Text>
          <Text>〜</Text>
          <Text>{moment(mission.endDate).format(`YYYY/MM/DD HH:mm`)}</Text>
        </HStack>
      </VStack>

      <VStack align="start"
        divider={<StackDivider />}
      >
      <StackDivider />
      {
        mission.missions.map(((data, index) => {
          console.log(data)
          return (
            <Box key={index}>
            <Text fontWeight="bold" mb={data.race ? 2 : 0}>{ data.name }</Text>
            { data.race && <Race {...data.race} showSeason={true} />}
            </Box>
          )
        }))
      }
      </VStack>
    </Layout>
  )
}

export default MissionDetailPage

export const query = graphql`
  query($id: String!) {
    mission: microcmsMission(id: {eq: $id }) {
      missions {
        name
        rewardName
        rewardNum
        race {
          id
          racecourse {
            id
          }
          qualification
          name
          handed
          grade
          fun
          distanceLabel
          distance
          crown
          season
          surface
        }
      }
      missionId
      name
      prefix
      startDate
      endDate
    }
  }
`