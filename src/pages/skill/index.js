import React from "react"
import { graphql, Link } from "gatsby"
import {
  Heading, 
  VStack, Box, SimpleGrid,
  Checkbox,
  useColorModeValue
} from "@chakra-ui/react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Skill from '../../components/parts/skill'
import { SkillTriggers } from '../../util/'

const frontMatter = {
  title: 'スキル',
  description: `ウマ娘やサポートカードが使えるスキル一覧です`
}

const SkillPage = ({ data }) => {
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.300")
  const [selectedTriggers, setSelectedTriggers] = React.useState([])

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
      <SimpleGrid columns={[3, null, 5]}>
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
      <VStack spacing={2} align="stretch">
        {filterd.length ? filterd.map(({ node }) => (
          <Box key={node.skillId} borderRadius="md"
          _hover={{
            background: hoverBg,
          }}>
            <Skill { ...node } showTrigger={Boolean(selectedTriggers.length)} />
          </Box>
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
          uniqe
          description,
          icon {
            url
          }
        }
      }
    }
  }
`