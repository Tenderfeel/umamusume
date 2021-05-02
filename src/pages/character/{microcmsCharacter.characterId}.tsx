/**
 * キャラ詳細ページ
 */
import * as React from "react"
import { graphql } from "gatsby"
import { Heading, Image, Flex, Box, Text, Table,
  Tbody, Tr, Th, Td, VisuallyHidden, Link,
  Tag,　HStack } from "@chakra-ui/react"
import { ExternalLinkIcon, StarIcon } from '@chakra-ui/icons'
// import { StaticImage } from "gatsby-plugin-image"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Alphabet from '@/components/parts/alphabet'
import SkillTable from '@/components/character/skill-table'
import SectionTitle from "@/components/parts/section-title"
import Goals from "@/components/character/goals"

const tableStyle = {
  width: `var(--chakra-sizes-full)`,
  borderCollapse: 'collapse',
  'tr + tr': {
    borderTopWidth: 1,
    borderTopColor: 'whiteAlpha.300'
  },
  'th, td': {
    textAlign: 'center'
  }
}

const CharacterPage = ({ data }) => {

  const frontMatter = {
    title: data.microcmsCharacter.name || 'ウマ娘',
    description: `${data.microcmsCharacter.name}の詳細情報`
  }

  const surface = data.microcmsCharacter.surface
  const distance = data.microcmsCharacter.distance
  const running = data.microcmsCharacter.running
  const birthDay = data.microcmsCharacter.birthDay

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Flex align="center" as="header" mt="2">
        <Box order={2}>
          <Heading as="h1" tabIndex={-1} outline={0}
            mb={3}
            fontWeight="bold"
            fontSize="xl"
            >
            {frontMatter.title}
          </Heading>
          <HStack mb="2">
            <Link href={data.microcmsCharacter.netkeiba} isExternal
              fontSize="sm">
              netkeiba.com <ExternalLinkIcon mx="2px" />
            </Link>
          </HStack>
          <HStack spacing="1">
            <Flex fontSize={['xs', 'sm']} align="center">
              <Tag mr={[1, 2]} fontSize={['xs', 'sm']} px={[1, 2]}>
                誕生日</Tag>{birthDay.month}月{birthDay.day}日
            </Flex>
            <Flex fontSize={['xs', 'sm']} align="center">
              <Tag mr={[1, 2]} fontSize={['xs', 'sm']} px={[1, 2]}>
                世代</Tag>{data.microcmsCharacter.generation}年
            </Flex>
          </HStack>
        </Box>
        <Box mr={2}>
          <Image
            src={data.microcmsCharacter.thumbnail.url}
            boxSize="100px"
            objectFit="contain"
            alt=""
          />
          <HStack justify="center" spacing="0" area-label="初期レア">
          {
            new Array(Number(data.microcmsCharacter.rare)).fill(null).map((d, i) => (
              <StarIcon key={i} boxSize={3} color="yellow.400" />
            ))
          }
          </HStack>
        </Box>
      </Flex>
      <VisuallyHidden as="div"><h2>適性</h2></VisuallyHidden>
      <Box marginTop="2" borderWidth="1px" borderRadius="lg" overflow="hidden">      
      <Table sx={{
          th: {
            width: '20%'
          },
          td: { width: 'calc(100% / 5)'},
          ...tableStyle
        }}
      >
        <Tbody>
          <Tr>
            <Th scope="row">バ場適性</Th>
            <Td>
              <Alphabet value={surface.turf}></Alphabet>
              <Text fontSize="sm">芝</Text>
            </Td>
            <Td>
              <Alphabet value={surface.dart}></Alphabet>
              <Text fontSize="sm">ダート</Text>
            </Td>
            <Td></Td>
            <Td></Td>
          </Tr>
          <Tr>
            <Th scope="row">距離適性</Th>
            <Td>
              <Alphabet value={distance.short}></Alphabet>
              <Text fontSize="sm">短距離</Text>
            </Td>
            <Td>
              <Alphabet value={distance.mile}></Alphabet>
              <Text fontSize="sm">マイル</Text>
            </Td>
            <Td>
              <Alphabet value={distance.middle}></Alphabet>
              <Text fontSize="sm">中距離</Text>
            </Td>
            <Td>
              <Alphabet value={distance.long}></Alphabet>
              <Text fontSize="sm">長距離</Text>
            </Td>
          </Tr>
          <Tr>
            <Th scope="row">脚質適性</Th>
            <Td>
              <Alphabet value={running.escape}></Alphabet>
              <Text fontSize="sm">逃げ</Text>
            </Td>
            <Td>
              <Alphabet value={running.ahead}></Alphabet>
              <Text fontSize="sm">先行</Text>
            </Td>
            <Td>
              <Alphabet value={running.forerunner}></Alphabet>
              <Text fontSize="sm">差し</Text>
            </Td>
            <Td>
              <Alphabet value={running.pursuer}></Alphabet>
              <Text fontSize="sm">追込</Text>
              </Td>
          </Tr>
        </Tbody>
      </Table>
      </Box>
      
      <VisuallyHidden as="div"><h2>成長率</h2></VisuallyHidden>
      <Box marginTop="2" borderWidth="1px" borderRadius="lg" overflow="hidden">      
        <Table
          sx={{...tableStyle, 'th': { width: 'calc(100% / 5)'}}}>
          <Tbody>
            <Tr>
              <Th scope="col">スピード</Th>
              <Th scope="col">スタミナ</Th>
              <Th scope="col">パワー</Th>
              <Th scope="col">根性</Th>
              <Th scope="col">賢さ</Th>
            </Tr>
            <Tr>
              <Td>{data.microcmsCharacter.growthRate.speed || 0}%</Td>
              <Td>{data.microcmsCharacter.growthRate.stamina || 0}%</Td>
              <Td>{data.microcmsCharacter.growthRate.power || 0}%</Td>
              <Td>{data.microcmsCharacter.growthRate.guts || 0}%</Td>
              <Td>{data.microcmsCharacter.growthRate.int || 0}%</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
  
      <SectionTitle>スキル</SectionTitle>
      
      <SkillTable skills={data.microcmsCharacter.skills} />

      <SectionTitle>
        育成目標
        {data.microcmsGoals?.scenario && <Text display="inline">（{data.microcmsGoals.scenario}）</Text>}
      </SectionTitle>

      <Goals goals={data.microcmsGoals?.goals} />
    </Layout>
  )
}

export default CharacterPage

export const query = graphql`
  query($id: String!, $characterId: String!) {
    microcmsCharacter(id: { eq: $id }) {
      name
      rare
      netkeiba
      thumbnail {
        url
        height
        width
      }
      generation
      surface {
        dart
        turf
      }
      skills {
        awakeLv
        skill {
          id
          name
          point
          rare
          trigger
          unique
          description,
          icon {
            url
          }
        }
      }
      running {
        ahead
        escape
        pursuer
        forerunner
      }
      growthRate {
        speed
        stamina
        power
        guts
        int
      }
      distance {
        long
        middle
        mile
        short
      }
      birthDay {
        day
        month
      }
      characterId
      materials {
        handed
        grade
        fun
        distanceLabel
        distance
        id
        name
        qualification
        season
        surface
        racecourse {
          id
        }
      }
    }
    microcmsGoals(character: {id: {eq: $characterId}}) {
      id
      scenario
      goals {
        event
        eventTurn
        turn
        race {
          name
          id
          distance
          distanceLabel
          fun
          grade
          handed
          season
          surface
          qualification
          racecourse {
            id
          }
        }
      }
    }
  }
`