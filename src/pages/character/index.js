/**
 * キャラ一覧ページ
 */
import React from "react"
import { graphql, Link } from "gatsby"
import {
  chakra,
  Heading, Image, HStack, Text, Tag,
  VStack, Box, Badge,
  Grid, GridItem,
  StackDivider,
  useColorModeValue
} from "@chakra-ui/react"
import { StarIcon } from '@chakra-ui/icons'
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const frontMatter = {
  title: 'キャラクター',
  description: '現在実装済みの育成ウマ娘一覧'
}

const CharacterPage = ({ data }) => {
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.300")

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">キャラクター</Heading>
      <VStack divider={<StackDivider />} spacing={2} align="stretch">
        {data.allMicrocmsCharacter.edges.map(({ node }) => (
          <Box key={node.characterId}
          borderRadius="md"
          _hover={{
            background: hoverBg,
          }}
          >
            <Link to={`/character/${node.characterId}`}>
              <Grid
                templateRows="auto 1fr"
                templateColumns="60px auto"
                templateAreas={`"icon name" "icon misc"`}
                gap="2"
              >
              <GridItem gridArea="icon">
                <Image
                  src={node.thumbnail.url}
                  boxSize="60px"
                  mr={2}
                  alt=""
                />
              </GridItem>
              <GridItem gridArea="name">
                <Text fontWeight="bold">{node.name}</Text>
              </GridItem>
              <GridItem gridArea="misc" fontSize="sm">
                <HStack>
                  <Box textAlign="center" lineHeight="1">
                  {
                    new Array(Number(node.rare)).fill(null).map((d, i) => (
                      <StarIcon key={i} boxSize={3} color="yellow.400" />
                    ))
                  }
                  </Box>
                  <Badge>{node.primarySurface}</Badge>
                  <Badge>{node.primaryDistance}</Badge>
                  <Text>
                    <Badge fontSize="xs" mr="2">誕生日</Badge>{node.birthDay.month}月{node.birthDay.day}日
                  </Text>
                </HStack>
              </GridItem>
            </Grid>
            </Link>
          </Box>
        ))}
      </VStack>
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