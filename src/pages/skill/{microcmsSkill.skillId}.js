/**
 * スキル詳細ページ
 */
import React from "react"
import { graphql } from "gatsby"
import { Image, Flex, Box, Text, Tag,
  Tooltip, SimpleGrid,
  Heading,
  useColorModeValue } from "@chakra-ui/react"

import SEO from "../../components/seo"
import Layout from "../../components/layout"
import CharacterList from "../../components/character/character-list"
import SectionTitle from "../../components/parts/section-title"
import SkillTrigger from '../../components/parts/skill-trigger'
import SupportCard from "../../components/parts/support-card"
import Skill from '../../components/parts/skill'
import NoData from '@/components/parts/nodata'

const SkillDetailPage = ({ data: { skill, characters, supportCards } }) =>  {
  const frontMatter = {
    title: skill.name || 'スキル詳細',
    description: `スキル「${skill.name}」の詳細情報`
  }

  // レアと固有はポイントの色を変える
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
      
      { skill.upgrade &&
        <Box as="section" mt="6">
        <SectionTitle>上位スキル</SectionTitle>
        <Skill {...skill.upgrade} />
      </Box>}

      { skill.downgrade &&
      <Box as="section" mt="6">
        <SectionTitle>下位スキル</SectionTitle>
        <Skill {...skill.downgrade} />
      </Box>}

      <Box as="section" mt="6">
        <SectionTitle>所持ウマ娘</SectionTitle>
        <CharacterList characters={characters} showBirthDay={false} />
      </Box>
      <Box as="section" mt="6">
        <SectionTitle>サポートカード</SectionTitle>
        
        <SimpleGrid minChildWidth="100px" spacing={2}>
        {
          supportCards.nodes.length ? supportCards.nodes.map((node) => (
            <SupportCard key={node.id} {...node}></SupportCard>
          )) : <NoData />
        }
      </SimpleGrid>
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
      upgrade {
        id
        description
        name
        point
        rare
        unique
        icon {
          url
        }
      }
      downgrade {
        id
        description
        name
        point
        rare
        unique
        icon {
          url
        }
      }
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

    supportCards: allMicrocmsSupportCard(filter: {skills: {elemMatch: {id: {eq: $skillId}}}}) {
      nodes {
        name
        id
        supportCardId
        type
        rare
        image {
          url
        }
      }
    }
  }
`