import * as React from "react"

import Layout from "../components/layout"

const frontMatter = {
  title: '404: Not found',
  description: `お探しのページが見つかりませんでした`
}

const NotFoundPage = () => (
  <Layout frontMatter={frontMatter}>
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
