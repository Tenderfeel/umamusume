import * as React from "react"
import { Link, navigate } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import {
 Heading, 
 VStack, Box, SimpleGrid,
 Checkbox, Image,
 CheckboxGroup,
 Tooltip,
 useColorModeValue
} from "@chakra-ui/react"

import GutsIcon from "@/images/guts.svg"
import SpeedIcon from "@/images/speed.svg"
import IntIcon from "@/images/int.svg"
import PowerIcon from "@/images/power.svg"
import StaminaIcon from "@/images/stamina.svg"

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

// カード枠線スタイル
const getCardBorderStyle = (rare: string[]): CardBorderStyle => {
  switch (rare[0]) {
    case 'SSR':
      return {
        background: `linear-gradient(135deg, rgb(245 98 255) 0%, rgb(165 47 232) 40%, rgb(3 185 255) 70%, rgb(252, 255, 114) 100%)`
      }
  }
}

interface TypeIconProps {
  type: string
}

// タイプ別アイコン
const TypeIcon = ({ type }: Required<TypeIconProps>) => {

  return (
    <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 6,
        'svg': {
          width: '100%'
        }
      }}>
      {type === 'スピード' && <SpeedIcon />}
      {type === 'スタミナ' && <StaminaIcon />}
      {type === 'パワー' && <PowerIcon />}
      {type === '根性' && <GutsIcon />}
      {type === '賢さ' && <IntIcon />}
    </Box>
  )
}

// メイン
const SupportCard = (props) => {
  const { 
    id, supportCardId, image, name, rare, type,
    enableLink = true
  } = props
  const path = supportCardId || id
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.300")
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.300")
  const outlineColor = useColorModeValue("white", "gray.800")
  const hoverStyle = enableLink ? {
          border: `solid 2px green`,
          boxShadow: `0 0 6px green`
        } : {}
  
  return (
    <Tooltip isDisabled={!enableLink}
    hasArrow
    label={`${name}`}
    >
    <Box
      width={100}
      onClick={e => {
        if (!enableLink) return
        e.preventDefault()
        navigate(`/support/${path}`)
      }}
      sx={{
        padding: 1,
        borderRadius: 'md',
        position: "relative",
        overflow: "hidden",
        cursor: enableLink ? 'pointer' : 'inherit',
        border: `solid 2px`,
        borderColor: outlineColor,
        _hover: hoverStyle,
        ...getCardBorderStyle(rare)
      }}
    >
      <Image src={image.url} 
        alt={name} width={100} 
        objectFit="contain"
        borderRadius="md"
        sx={{}} 
      />
      <TypeIcon type={type.toString()} />
    </Box>
    </Tooltip>
  )
}

export default SupportCard