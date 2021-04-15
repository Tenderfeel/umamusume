/**
 * スキル単体表示
 */

import * as React from "react"
import { Link, navigate } from "gatsby"
import { Image, Text, Box,
  Grid, GridItem, Badge,
  useColorModeValue,
  HStack
} from "@chakra-ui/react"

import SkillTrigger from './skill-trigger'

/**
 * Interface of Skill
 */
interface Skill {
 id: string,
 skillId: string,
 icon?: {
   url: string
 },
 name: string,
 description?: string,
 point: number,
 unique: boolean,
 rare: boolean,
 trigger: string[],
 showTrigger: boolean
}

/**
 * Skill
 */
const Skill = ({ 
  id, skillId, icon, name, description, 
  point, unique, rare, trigger,
  showTrigger
}: Skill) => {
  let borderColor = useColorModeValue("gray.300", "whiteAlpha.300")
  const pointColor = useColorModeValue(
    (rare || unique) ? "black": "orange.400",
    (rare || unique) ? "yellow.300": "white"
  )
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.300")

  const path = skillId || id

  return (
    <Box borderRadius="md"
      _hover={{
        background: hoverBg,
        cursor: 'pointer'
      }}
      onClick={e => {
        e.preventDefault()
        navigate(`/skill/${path}`)
      }}>
    <Grid 
      templateRows="auto 1fr"
      templateColumns="80px auto 70px"
      templateAreas={`"icon name point" "icon description point"`}
      border="1px"
      borderColor={borderColor}
      borderRadius="md"
      >
      <GridItem gridArea="icon" p="2">
        <Image src={icon?.url} />
      </GridItem>
      <GridItem gridArea="name" py="2">
        <Link to={`/skill/${path}`}>
          <Text variant="skill">{name}</Text>
        </Link>
      </GridItem>
      <GridItem gridArea="description" pr="2" fontSize="sm">
        <p>{description}</p>
        <SkillTrigger showTrigger={showTrigger} trigger={trigger} />
      </GridItem>
      <GridItem gridArea="point" 
        textAlign="center"
        display="grid"
        alignItems="center"
        borderLeft="1px"
        borderColor={borderColor}
        borderStyle="dashed"
        color={pointColor}
      >
        {unique ? '固有' : point}
      </GridItem>
    </Grid>
    </Box>
  )
}

export default Skill