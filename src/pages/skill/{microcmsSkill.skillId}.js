/**
 * スキル詳細ページ
 */
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const SkillDetailPage = ({ data }) => (
  <Layout>
    <SEO title={data.microcmsSkill.name} />
    <h1>{data.microcmsSkill.name}</h1>
  </Layout>
)

export default SkillDetailPage

export const query = graphql`
  query {
    microcmsSkill {
      description
      name
      point
      rare
      skillId
      uniqe
    }
  }
`