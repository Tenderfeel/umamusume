/**
 * サイトフッター
 */

 import * as React from "react"
 import { Box, Text } from "@chakra-ui/react"

 export const Footer = () => (
  <Box as="footer" mt={12} textAlign="center">
    <Text fontSize="sm">
    © {new Date().getFullYear()} <a href="https://twitter.com/Tenderfeel">Tenderfeel</a>
    </Text>
  </Box>
)

export default Footer