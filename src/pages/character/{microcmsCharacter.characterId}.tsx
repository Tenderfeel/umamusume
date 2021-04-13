/**
 * キャラ詳細ページ
 */
import React from "react"
import { graphql } from "gatsby"
import { chakra, Image, Flex, Box, Text, Table,
  Tbody, Tr, Th, Td, VisuallyHidden,
  Tag,　HStack } from "@chakra-ui/react"
// import { StaticImage } from "gatsby-plugin-image"
import Layout from "../../components/layout"

import SEO from "../../components/seo"
import Alphabet from '../../components/parts/alphabet'
import SkillTable from '../../components/character/skill-table'
import SectionTitle from "../../components/parts/section-title"

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
          <chakra.h1 tabIndex={-1} outline={0}
            mb={6}
            fontWeight="bold"
            fontSize="xl"
            >
              {frontMatter.title}
          </chakra.h1>
          <HStack>
            <Text>
              <Tag mr="2">初期レア</Tag>{data.microcmsCharacter.rare}
            </Text>
            <Text>
              <Tag mr="2">誕生日</Tag>{birthDay.month}月{birthDay.day}日
            </Text>
            <Text>
              <Tag mr="2">世代</Tag>{data.microcmsCharacter.generation}年
            </Text>
          </HStack>
        </Box>
        <Image
          src={data.microcmsCharacter.thumbnail.url}
          boxSize="100px"
          objectFit="contain"
          mr={2}
          alt=""
        />
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
    </Layout>
  )
}

export default CharacterPage

export const query = graphql`
  query($id: String!) {
    microcmsCharacter(id: { eq: $id }) {
        name
        rare
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
      }
  }
`