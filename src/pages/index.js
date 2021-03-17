/**
 * サイトホーム
 */
import * as React from "react"
import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"
import {
  chakra,
  DarkMode,
  useColorMode,
  useColorModeValue,
  Button,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Container,
} from "@chakra-ui/react"

import Layout from "../components/layout"
import SEO from "../components/seo"


function Switcher() {
  const { toggleColorMode: toggleMode } = useColorMode()
  const text = useColorModeValue("light-man", "dark-man")
  return <button onClick={toggleMode}>Current mode: {text}</button>
}

const IndexPage = () => (
  <Layout>
    <Container>
      <SEO title="Home" />
      
      <Switcher />
      <Stack direction="row" spacing="40px" mb="8">
        <div>Welcome home</div>
        <div>Welcome home</div>
        <div>Welcome home</div>
      </Stack>
    {/* <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    /> */}
    <p>
      <Link to="/character/">キャラクター</Link> <br />
      <Link to="/skill/">スキル</Link>
    </p>
    </Container>
  </Layout>
)

export default IndexPage
