/**
 * スキル
 */

import React from "react"
import { Link } from "gatsby"
import { Image, Text,
  Grid, GridItem, Badge,
  useColorModeValue,
  HStack
} from "@chakra-ui/react"

const SkillTrigger = ({ showTrigger, trigger }) => {

  console.log(showTrigger)
  if (showTrigger && trigger.length) {
    return (
      <HStack py="2">
        {
          trigger.map(text => (
            <Badge colorScheme="green" key={text}>{text}</Badge>
          ))
        }
      </HStack>
    )
  }

  return null
}

const Skill = ({ 
  id, skillId, icon, name, description, 
  point, uniqe, rare, trigger,
  showTrigger
}) => {
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.300")
  const path = id || skillId
  return (
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
      >
        {uniqe ? '固有' : point}
      </GridItem>
    </Grid>
  )
}

export default Skill