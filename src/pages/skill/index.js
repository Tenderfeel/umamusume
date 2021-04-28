/**
 * スキル一覧ページ
 */
import React from "react"
import { graphql } from "gatsby"
import {
  Heading, 
  VStack, Box, SimpleGrid,
  Checkbox,
  CheckboxGroup,
  Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel,
  useColorModeValue
} from "@chakra-ui/react"
import Layout from "@/components/layout"
import SEO from "@/components/seo"
import Skill from '@/components/parts/skill'
import { SkillTriggers } from '@/util'
import NoData from '@/components/parts/nodata'

const frontMatter = {
  title: 'スキル',
  description: `ウマ娘やサポートカードが使えるスキル一覧です`
}

const SkillPage = ({ data }) => {
  const [selectedTriggers, setSelectedTriggers] = React.useState([])
  const boxBgColor = useColorModeValue('gray.50','gray.900')

  const filterd = data.allMicrocmsSkill.edges.filter(({ node }) => {
    if (!node.trigger) return false
    if (!selectedTriggers.length) return true

    // 選択されたトリガーのいずれかがマッチするか？
    return selectedTriggers.some(trigger => {
      return node.trigger.includes(trigger)
    })
  })    

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">スキル</Heading>
      
      <Accordion allowToggle size="sm">
        <AccordionItem mb="2" borderLeftWidth="1px" borderRightWidth="1px">
          <AccordionButton>
            <Box as="h2" flex="1" textAlign="left">
              絞り込み
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <CheckboxGroup size="sm">
              <SimpleGrid columns={[3, 4, null, 5]}>
                {
                  SkillTriggers.map(trigger => (
                    <Checkbox key={trigger}
                    name={trigger}
                    onChange={(e) => setSelectedTriggers(
                      e.target.checked ? 
                          [ ...selectedTriggers, e.target.name ]
                          : selectedTriggers.filter(i => i !== e.target.name)
                    )}>{trigger}</Checkbox>
                  ))
                }
              </SimpleGrid>
            </CheckboxGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <VStack spacing={2} align="stretch">
        {filterd.length ? filterd.map(({ node }) => (
          <Skill { ...node } key={node.skillId} showTrigger={Boolean(selectedTriggers.length)} />
        )) : <Box borderWidth="1px"
              borderRadius="md"
              p="6"
              textAlign="center"
              color="gray.500"
            >No data</Box>}
      </VStack>
    </Layout>
  )
}

export default SkillPage

export const query = graphql`
  query {
    allMicrocmsSkill {
      edges {
        node {
          skillId
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
    }
  }
`