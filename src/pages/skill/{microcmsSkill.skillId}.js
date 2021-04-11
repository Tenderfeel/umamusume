/**
 * スキル詳細ページ
 */
import React from "react"
import { graphql, Link } from "gatsby"
import { chakra, Image, Flex, Box, Text, Table,
  Tbody, Tr, Th, Td, VisuallyHidden,
  Heading, Tag,　HStack } from "@chakra-ui/react"

import SEO from "../../components/seo"
import Layout from "../../components/layout"

const SkillDetailPage = ({ data }) =>  {
  const frontMatter = {
    title: data.microcmsSkill.name || 'ウマ娘',
    description: `スキル「${data.microcmsSkill.name}」の詳細情報`
  }
console.log(data.microcmsSkill.id)
  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Flex align="center" as="header" mt="2"  mb="2" order="1">
        <Image src={data.microcmsSkill.icon?.url} 
          boxSize="40px"
          objectFit="cover" 
        />
        <Heading order="2" size="md" ml="2">
          {data.microcmsSkill.name}
        </Heading>
      </Flex>
      <Text fontSize="sm">{data.microcmsSkill.description}</Text>

      {data.allMicrocmsCharacter.edges.map(({ node }) => (
        <Box key={node.characterId}>
          <Text fontWeight="bold">{node.name}</Text>
        </Box>
      ))}
    </Layout>
  )
}

export default SkillDetailPage

export const query = graphql`
  query($id: String!, $skillId: String!) {
    microcmsSkill(id: { eq: $id }) {
      id
      description
      name
      point
      rare
      skillId
      uniqe
      icon {
        url
      }
    }
    allMicrocmsCharacter(
      filter: {skills: {elemMatch: {skill: {id: {eq: $skillId }}}}}
    ) {
      edges {
        node {
          characterId
          name
          rare
          primarySurface
          primaryDistance
          thumbnail {
            url
            height
            width
          }
        }
      }
    }
  }
`