/**
 * スキル詳細ページ
 */
import React from "react"
import { graphql } from "gatsby"
import { Image, Flex, Box, Text, Tag,
  Tooltip,
  Heading,
  useColorModeValue } from "@chakra-ui/react"

import SEO from "../../components/seo"
import Layout from "../../components/layout"
import CharacterList from "../../components/character/character-list"
import SectionTitle from "../../components/parts/section-title"
import SkillTrigger from '../../components/parts/skill-trigger'

const SkillDetailPage = ({ data: { skill, characters } }) =>  {
  const frontMatter = {
    title: skill.name || 'スキル詳細',
    description: `スキル「${skill.name}」の詳細情報`
  }

  const pointColor = useColorModeValue(
    (skill.rare || skill.unique) ? "black": "orange.400",
    (skill.rare || skill.unique) ? "yellow.300": "white"
  )
  
  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Flex align="center" as="header" mt="2"  mb="2">
        <Image src={skill.icon?.url} 
          boxSize="40px"
          objectFit="cover" 
          order="1"
        />
        <Flex order="2" ml="2" justify="space-between" width="100%">
          <Heading size="md">
            {skill.name}
          </Heading>
          {skill.unique && <Tag>固有</Tag>}
          {skill.point > 0 && 
            <Tooltip hasArrow label="スキルPt">
              <Tag color={pointColor}>{skill.point}</Tag>
            </Tooltip>
          }
        </Flex>
      </Flex>
      <Text fontSize="sm">{skill.description}</Text>

      <SkillTrigger showTrigger={true} trigger={skill.trigger} />
      
      <Box as="section" mt="6">
        <SectionTitle>所持ウマ娘</SectionTitle>
        <CharacterList characters={characters} />
      </Box>
    </Layout>
  )
}

export default SkillDetailPage

export const query = graphql`
  query($id: String!, $skillId: String!) {
    skill: microcmsSkill(id: { eq: $id }) {
      id
      description
      name
      point
      rare
      skillId
      unique
      trigger
      icon {
        url
      }
    }
    characters: allMicrocmsCharacter(
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
          birthDay {
            day
            month
          }
        }
      }
    }
  }
`