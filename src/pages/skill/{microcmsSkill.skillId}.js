/**
 * スキル詳細ページ
 */
import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/layout"

const SkillDetailPage = ({ data }) =>  {
  const frontMatter = {
    title: data.microcmsSkill.name || 'ウマ娘',
    description: `スキル「${data.microcmsSkill.name}」の詳細情報`
  }

  return (
    <Layout frontMatter={frontMatter}>
      <p>{data.microcmsSkill.description}</p>
    </Layout>
  )
}

export default SkillDetailPage

export const query = graphql`
  query($id: String!) {
    microcmsSkill(id: { eq: $id }) {
      description
      name
      point
      rare
      skillId
      uniqe
    }
  }
`