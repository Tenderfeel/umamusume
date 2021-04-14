import * as React from "react"
import { Link, navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import {
 Heading, 
 VStack, Box, SimpleGrid,
 Checkbox, Image,
 CheckboxGroup,
 useColorModeValue
} from "@chakra-ui/react"

import GutsIcon from "../../images/guts.svg"

interface SupportCard {
  id: string,
  supportCardId: string,
  name: string,
  type: string[],
  rare: string[],
  image?: { url: string }
}

interface CardBorderStyle {
  background: string
}

const getCardBorderStyle = (rare: string[]): CardBorderStyle => {
  switch (rare[0]) {
    case 'SSR':
      return {
        background: `linear-gradient(135deg, rgb(245 98 255) 0%, rgb(165 47 232) 40%, rgb(3 185 255) 70%, rgb(252, 255, 114) 100%)`
      }
  }
}

const SupportCard = ({ id, supportCardId, image, name, rare, type }) => {
  const path = supportCardId || id
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.300")
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.300")

console.log(type)
  return (
    <Box
      width={100}
      
      onClick={e => {
        e.preventDefault()
        navigate(`/skill/${path}`)
      }}
      sx={{
        padding: 1,
        borderRadius: 'md',
        position: "relative",
        overflow: "hidden",
        cursor: 'pointer',
        border: `solid 2px`,
        borderColor: 'gray.800',
        _hover: {
          border: `solid 2px green`,
          boxShadow: `0 0 6px green`
        },
        ...getCardBorderStyle(rare)
      }}
    >
      <Image src={image.url} 
        alt={name} width={100} 
        objectFit="contain"
        borderRadius="md"
        sx={{}} 
      />
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 6,
        'svg': {
          width: '100%'
        }
      }}><GutsIcon /></Box>
    </Box>
  )
}

export default SupportCard