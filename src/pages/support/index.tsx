/**
 * サポートカード一覧ページ
 */
 import * as React from "react"
 import { graphql } from "gatsby"
 import {
  Heading, 
  SimpleGrid,
  Checkbox,
  CheckboxGroup,
  useColorModeValue
} from "@chakra-ui/react"

 import SEO from "../../components/seo"
 import Layout from "../../components/layout"
 import SupportCard from "../../components/parts/support-card"


 const frontMatter = {
  title: 'サポートカード',
  description: `サポートカード一覧です`
}

 const SupportPage = ({ data }) => {

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Heading size="md" 
        mt="3" mb="6">サポートカード</Heading>
      <SimpleGrid minChildWidth="100px" spacing={2}>
        {
          data.allMicrocmsSupportCard.nodes.map((node) => (
            <SupportCard key={node.id} {...node}></SupportCard>
          ))
        }
      </SimpleGrid>
    </Layout>
  )
 }

 export default SupportPage

 export const query = graphql`
  query {
    allMicrocmsSupportCard {
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