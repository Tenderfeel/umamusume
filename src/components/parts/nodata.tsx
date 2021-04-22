import * as React from "react"

import { 
  Box,
  useColorModeValue,
} from "@chakra-ui/react"

const NoData = () => {
  return (
    <Box borderWidth="1px"
      borderRadius="md"
      p="6"
      textAlign="center"
      color="gray.500"
    >No data</Box>
  )
}

export default NoData