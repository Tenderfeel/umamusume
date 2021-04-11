/**
 * キャラ詳細ページ用スキルテーブル
 */

import React from "react"
import { Text, Table, Box,
  Thead, Tbody, Tr, Th, Td,
  useColorModeValue
} from "@chakra-ui/react"

import Skill from '../parts/skill'

const SkillTable = ({ skills }) => {

  if (!skills.length) {
    return (
      <Box borderWidth="1px"
        borderRadius="md"
        p="6"
        textAlign="center"
        color="gray.500"
      >No skill data</Box>
    )
  }
  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th scope="col">覚醒</Th>
          <Th scope="col" textAlign="center">スキル名/効果/Pt</Th>
        </Tr>
      </Thead>
      <Tbody>
      {skills.map(({ awakeLv, skill }) => (
        <Tr key={skill.id}>
          <Td border="0" textAlign="center">
            <Text fontWeight="bolder">Lv.{awakeLv}</Text>
          </Td>
          <Td border="0" px="0">
            <Skill { ...skill } />
          </Td>
        </Tr>
      ))}
      </Tbody>
    </Table>
  )
} 

export default SkillTable