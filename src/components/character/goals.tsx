/**
 * 育成目標
 */

import React from "react"
import {
  Heading, 
  Flex, VStack, Box, Text,
  useColorModeValue
} from "@chakra-ui/react"
import { createIcon } from '@chakra-ui/icons'
import NoData from '@/components/parts/nodata'
import Race from '@/components/parts/race'

// ターン背景の三角
const TurnArrowIcon = createIcon({
  displayName: "TurnArrowIcon",
  viewBox: '0 0 82 27',
  d: 'M41 27L0.296804 0.750008L81.7032 0.750001L41 27Z'
})

// ターン
const Turn = ({ turn }) => {
  const bgColor = useColorModeValue('gray.200', 'gray.700')
  return (
    <Box textAlign="center" position="relative" mt="2">
      <TurnArrowIcon 
        w={94}
        h={35}
        color={bgColor}
        sx={{
          position: 'absolute',
          top: '-0.3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: -1
        }}
      />

      <Text fontWeight="bold">{turn || 0}<small>ターン</small></Text>
    </Box>
  )
}

// イベント
const EventBox = ({ event, turn }) => {
  if (event.length === 0) return null
  let bgColor

  if (event.includes('因子継承')) {
    bgColor = useColorModeValue('pink.200', 'pink.800')
  } else if (event.includes('夏季合宿')) {
    bgColor = useColorModeValue('cyan.200', 'cyan.900')
  }

  return (
    <Flex justify="center">
      <Box 
        borderWidth="1px" 
        borderRadius="md"
        textAlign="center"
        p={2}
        width={200}
        bg={bgColor}
        fontSize={{ base: "xs", md: "sm" }}
        fontWeight="bold"
      >
        {event}
        {turn && <small display="inline">（{turn}ターン）</small>}
      </Box>
    </Flex>
  )
}

const Goals = ({ goals }) => {
  if (!goals || !goals.length) {
    return (
      <NoData />
    )
  }


  console.log(goals)

   return (
     <VStack spacing={2} align="stretch">
     {
       goals.map((goal, index) => (
          <Box key={index}>
            <EventBox event={goal.event} turn={goal.eventTurn} />

            {goal.race && <Race {...goal.race} />}
            
            <Turn turn={goal.turn} />
          </Box>
       ))
     }
     </VStack>
   )
}

export default Goals