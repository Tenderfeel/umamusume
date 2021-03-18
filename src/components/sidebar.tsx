import * as React from "react"
import { Link } from "gatsby"

import {
  Box,
  Flex,
  List,
  ListItem,
  Center,
  useColorModeValue,
  chakra
} from "@chakra-ui/react"

const mainNavLinks = [
  {
    href: "/character",
    label: "キャラクター",
  },
]

const Sidebar = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const color = useColorModeValue("gray.700", "whiteAlpha.900")
  console.log(color)
  const activeStyle = {
    display: 'block',
    background: useColorModeValue("teal.50", "rgba(48, 140, 122, 0.3)"),
    transition: "all 0.2s",
    color: useColorModeValue("teal.700", "teal.200"),
    fontWeight: "600"
  }
  
  return (
    <Box
      ref={ref}
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: "contain",
      }}
      top="2.8rem"
      w="280px"
      h="calc((100vh - 1.5rem) - 64px);"
      pr="8"
      pb="8"
      pl="3"
      pt="3"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      display={{ base: "none", md: "block" }}
    >
      <List spacing="4" styleType="none">
      {mainNavLinks.map((item) => (
        <ListItem key={item.label} rounded="md" overflow="hidden">
            <Link to={item.href}
              activeStyle={activeStyle}>
              <chakra.div px="3"
                py="1"
                fontSize="sm"
                fontWeight="500">
                {item.label}
              </chakra.div>
            </Link>
        </ListItem>
      ))}
    </List>
    </Box>
  )
}


export default Sidebar