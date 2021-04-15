/**
 * サイトフッター
 */

 import * as React from "react"
 import { Box, Text, Link } from "@chakra-ui/react"

 export const Footer = () => (
  <Box as="footer" mt={12} textAlign="center">
    <Box>
      <Link sx={{fontSize: 'sm'}} href="https://www.cygames.co.jp/" target="_blank" title="株式会社Cygames">© Cygames, Inc.</Link>
      <Text fontSize="xs">当サイトのコンテンツ内で使用しているゲーム画像の著作権
      その他の知的財産権は、株式会社Cygamesに帰属しています。</Text>
    </Box>
    <Text fontSize="sm" mt="2">
    © {new Date().getFullYear()} <a href="https://twitter.com/Tenderfeel">Tenderfeel</a>
    </Text>
  </Box>
)

export default Footer