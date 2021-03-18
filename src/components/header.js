/**
 * サイトヘッダー
 */
import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import {
  chakra,
  Flex,
  Box,
  IconButton,
  useColorMode,
  useColorModeValue
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

const Header = () => {
  const ref = React.useRef(null)
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}
  const bg = useColorModeValue("teal.500", "teal.700")
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const { toggleColorMode: toggleMode } = useColorMode()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? "sm" : undefined}
      transition="box-shadow 0.2s"
      pos="fixed"
      top="0"
      zIndex="3"
      bg={bg}
      left="0"
      right="0"
      borderTop="6px solid"
      borderTopColor="teal.900"
      backgroundColor="teal.600"
      width="full"
    >
      <Flex w="100%" h="100%" px="6" align="center" justify="space-between">
        <Flex align="center">
          <Link to="/" display="block" aria-label="Back to homepage">
              <chakra.span display="block"
                color="white"
                fontWeight="bold"
                fontSize="1rem"
                minWidth="5rem"
              >
                {data.site.siteMetadata?.title}
              </chakra.span>
          </Link>
        </Flex>
        <Flex
          justify="flex-end"
          w="100%"
          maxW="824px"
          align="center"
          color="gray.400"
        >
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${text} mode`}
            variant="ghost"
            color="current"
            ml={{ base: "0", md: "3" }}
            onClick={toggleMode}
            icon={<SwitchIcon />}
          />
        </Flex>
      </Flex>
    </chakra.header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
