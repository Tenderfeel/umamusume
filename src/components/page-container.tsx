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
  const { title, description } = frontMatter

  return (
    <>
      <SEO title={title} description={description} />
      <SkipNavLink zIndex={20}>Skip to Content</SkipNavLink>
      <Header />
      <Container
        pt="46px"
        display={{ base: "block", md: "flex" }}
      >
          <Sidebar />
          <div style={{ flex: 1 }}>
            <SkipNavContent />
            <Box
               as="main" 
              id="content"
              overflow="hidden"
              mx="auto"
              maxW="48rem"
              minH="76vh"
            >
              <PageTransition>
                {children}
              </PageTransition>
              {pagination || null}
            </Box>
            <Footer />
          </div>
      </Container>
    </>
  )
}

export default PageContainer