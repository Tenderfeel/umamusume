import * as React from "react"
import { Box, chakra } from "@chakra-ui/react"
import { SkipNavContent, SkipNavLink } from "@chakra-ui/skip-nav"
import Container from "./container"
import SEO from "./seo"
import Footer from "./footer"
import Header from "./header"
import Sidebar from './sidebar'
import PageTransition from "./page-transition"

interface PageContainerProps {
  frontMatter: {
    title: string
    description?: string,
  },
  children: React.ReactNode
  pagination?: any
}

function PageContainer(props: PageContainerProps) {
  const {  frontMatter, children, pagination } = props
  const {title, description } = frontMatter
  
  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container as="main" className="main-content">
        <Box display={{ base: "block", md: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box
              id="content"
              pt={3}
              px={5}
              mt="2rem"
              mx="auto"
              maxW="48rem"
              minH="76vh"
            >
              <PageTransition>
                <chakra.h1 tabIndex={-1} outline={0} apply="mdx.h1">
                  {title}
                </chakra.h1>
                {children}
              </PageTransition>
              {pagination || null}
            </Box>
            <Footer />
          </div>
        </Box>
      </Container>
    </>
  )
}

export default PageContainer