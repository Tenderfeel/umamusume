/**
 * レース単体表示
 */

import * as React from "react"
import { Image, Text, Box, Flex, HStack, VStack,
  Tag,
  Grid, Badge,
  useColorModeValue,
} from "@chakra-ui/react"

import { RaceCouseIdMap } from "@/util"

interface Race {
  id: string,
  raceId: string,
  name: string,
  grade: string[],
  distance: number,
  distanceLabel: string[],
  handed: string[],
  season: string[],
  surface: string[],
  qualification: string[],
  racecourse: {
    id: string,
    name: string,
    shortName: string,
  },
  crown: string[]
}

// レースグレード
const GradeTag = ({ grade }) => {
  let color = 'orange' // op, pre-op
  switch (grade[0]) {
    case 'デビュー':
    case '未勝利':
      color = 'green'
      break
    case 'G I':
      color = 'blue'
      break
    case 'G II':
      color = 'pink'
      break
    case 'G III':
      color = 'cyan'
      break
  }
  return (
    <Tag borderRadius="full" colorScheme={color} size={['sm']}>
      {grade}
    </Tag>
  )
}

// 競馬場（略称）
const RaceCourse = ({ racecourse }) => {

  if (!racecourse) return null

  if (racecourse.shortName) {
    return (<Text>{racecourse.shortName}</Text>)
  }

  // IDしかない場合
  if (racecourse.id) {
    return (<Text>{RaceCouseIdMap[racecourse.id]}</Text>)
  }
}

// レース
const Race = ({
  name,
  grade,
  racecourse,
  surface,
  distance,
  distanceLabel,
  handed,
  qualification,
  crown,
  season,
  showSeason
}: Race) => {
  const borderColor = useColorModeValue("gray.300", "whiteAlpha.300")
  const hoverBg = useColorModeValue("blue.50", "whiteAlpha.300")

  return (
    <Box border="1px"
      borderColor={borderColor}
      borderRadius="md"
      p="2"
      _hover={{
        background: hoverBg,
        cursor: 'pointer'
      }}
    >
      <Grid 
      templateRows="auto 1fr"
      templateColumns="auto 1fr"
      templateAreas={`"tag name" "tag detail"`}
      gap="2"
      >
      {/* クラシックとか */}
        <VStack gridArea="tag">
          {
            qualification.map(qua => (
              <Badge 
                key={qua}
                borderRadius="full"
                size="sm"
                textTransform="none"
              >{qua === 'ジュニア' ? 'Jr' : qua.charAt(0)}</Badge>
            ))
          }
        </VStack>
      {/* タイトル */}
        <Flex gridArea="name" align="center" justify="space-between">
          <Flex flex="auto">
            <GradeTag grade={grade} />
            <Text fontWeight="bold" px="1" fontSize={['sm', 'md']}>
              {name}
            </Text>
          </Flex>
          {!!crown?.length && <Badge size="sm" colorScheme="red">{crown}</Badge>}
        </Flex>
      {/* 詳細 */}
        <HStack 
          gridArea="detail" 
          justify="start"
          fontSize={['xxs', 'xs', 'sm']}
          spacing="1"
        >
          {(showSeason && season) && <Text>{season}</Text>}
          <RaceCourse racecourse={racecourse} />
          <Text>{surface}</Text>
          <Text>{distance}m</Text>
          <Text>（{distanceLabel}）</Text>
          <Text>{handed}</Text>
        </HStack>
      </Grid>
    </Box>
  )
}

export default Race