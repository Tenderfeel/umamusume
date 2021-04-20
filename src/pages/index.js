/**
 * サイトホーム
 */
import * as React from "react"
import { Link } from "gatsby"

import {
  Text,
} from "@chakra-ui/react"

import Layout from "../components/layout"


const frontMatter = {
  title: 'ホーム',
  description: 'ウマ娘のツール'
}

const IndexPage = () => (
  <Layout frontMatter={frontMatter}>
      <Text fontSize="3xl" mt="6" textAlign="center">🥕🐴🥕🐴🥕</Text>
  </Layout>
)

export default IndexPage
