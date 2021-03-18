/**
 * サイトホーム
 */
import * as React from "react"
import { Link } from "gatsby"

import {
  Stack,
} from "@chakra-ui/react"

import Layout from "../components/layout"


const frontMatter = {
  title: 'ホーム',
  description: 'ウマ娘のツール'
}

const IndexPage = () => (
  <Layout frontMatter={frontMatter}>
      <Stack direction="row" spacing="40px" mb="8">
        <div>Welcome home</div>
        <div>Welcome home</div>
        <div>Welcome home</div>
      </Stack>
    
    <p>
      <Link to="/character/">キャラクター</Link> <br />
      <Link to="/skill/">スキル</Link>
    </p>
  </Layout>
)

export default IndexPage
