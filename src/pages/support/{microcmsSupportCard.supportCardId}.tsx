/**
 * サポートカード詳細ページ
 */
import * as React from "react"
import { graphql } from "gatsby"
import { Image, 
  Heading, VStack,
  Grid, Flex, Box, Text, Table,
  Tbody, Tr, Th, Td, VisuallyHidden,
  Tag,　HStack } from "@chakra-ui/react"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import SupportCard from "../../components/parts/support-card"
import SectionTitle from "../../components/parts/section-title"
import Skill from '../../components/parts/skill'


// メイン
const SupportCardPage = ({ data }) => {
  const frontMatter = {
    title: data.microcmsSupportCard.name || 'サポートカード詳細',
    description: `${data.microcmsSupportCard.name}の詳細情報`
  }
  const {
    type, rare, name, skills, image
  } = data.microcmsSupportCard

  return (
    <Layout frontMatter={frontMatter}>
      <SEO {...frontMatter} />
      <Grid as="header" mt="2" sx={{
        gridTemplateColumns: `auto 1fr`,
        gridTemplateRows: `auto 1fr`,
        gridTemplateAreas: `"image title" "image status"`,
        gridColumnGap: 3,
        gridRowGap: 3
      }}>
        <Heading as="h1"
          sx={{
            fontSize: "xl",
            gridArea: 'title'
          }}
        >
          {data.microcmsSupportCard.name}
        </Heading>
        <Box gridArea="image">
          <SupportCard {...data.microcmsSupportCard} enableLink={false} />
        </Box>
        <Table sx={{
          gridArea: 'status',
          'th': {
            w: "6rem"
          }
        }}>
          <Tbody>
            <Tr>
              <Th scope="row">レアリティ</Th>
              <Td>{rare}</Td>
            </Tr>
            <Tr>
              <Th scope="row">タイプ</Th>
              <Td>{type}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Grid>

      <SectionTitle>所持スキル</SectionTitle>
      
      <VStack spacing={2} align="stretch">
        {skills.length ? skills.map((props) => (
          <Skill { ...props } key={props.id}  />
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

export const query = graphql`
query($id: String!) {
  microcmsSupportCard(id: {eq: $id}) {
    image {
      url
    }
    name
    rare
    type
    skills {
      id
      icon {
        url
      }
      name
      point
      rare
      trigger
      unique
      description
    }
    supportCardId
  }
}
`


export default SupportCardPage