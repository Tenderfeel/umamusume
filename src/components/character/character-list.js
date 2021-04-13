/**
 * キャラクターリスト
 */
import React from "react"
import { Link } from "gatsby"
import {
  Image, HStack, Text, 
  VStack, Box, Badge,
  Grid, GridItem,
  StackDivider,
  useColorModeValue
} from "@chakra-ui/react"

import { StarIcon } from '@chakra-ui/icons'

const CharacterList = ({ characters }) => {
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.300")
  
  if (!characters.edges.length) {
    return (<Box>No Data</Box>)
  }
  
  return (
    <VStack divider={<StackDivider />} spacing={2} align="stretch">
        {characters.edges.map(({ node }) => (
          <Box key={node.characterId}
          borderRadius="md"
          _hover={{
            background: hoverBg,
          }}
          >
            <Link to={`/character/${node.characterId}`}>
              <Grid
                templateRows="auto 1fr"
                templateColumns="60px auto"
                templateAreas={`"icon name" "icon misc"`}
                gap="2"
              >
              <GridItem gridArea="icon">
                <Image
                  src={node.thumbnail.url}
                  boxSize="60px"
                  mr={2}
                  alt=""
                />
              </GridItem>
              <GridItem gridArea="name">
                <Text fontWeight="bold">{node.name}</Text>
              </GridItem>
              <GridItem gridArea="misc" fontSize="sm">
                <HStack>
                  <Box textAlign="center" lineHeight="1">
                  {
                    new Array(Number(node.rare)).fill(null).map((d, i) => (
                      <StarIcon key={i} boxSize={3} color="yellow.400" />
                    ))
                  }
                  </Box>
                  <Badge>{node.primarySurface}</Badge>
                  <Badge>{node.primaryDistance}</Badge>
                  <Text>
                    <Badge fontSize="xs" mr="2">誕生日</Badge>{node.birthDay.month}月{node.birthDay.day}日
                  </Text>
                </HStack>
              </GridItem>
            </Grid>
            </Link>
          </Box>
        ))}
      </VStack>
  )
}

export default CharacterList