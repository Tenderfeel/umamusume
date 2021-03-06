/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */
import * as React from 'react'
import PropTypes from "prop-types"

import PageContainer from "./page-container"

interface LayoutProps {
  children?: any,
  frontMatter: {
    title?: string,
    description?: string
  }
}

const Layout = ({ children, frontMatter }: LayoutProps) => {
  return (
    <>
      <PageContainer frontMatter={frontMatter}>{children}</PageContainer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
