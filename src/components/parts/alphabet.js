import React from "react"
import { Text } from "@chakra-ui/react"

const Status = ({value}) => {
  /**
  * A~Gのステータスに合わせた色を返す
  * @param {Array.<string>} value 
  * @return {string}
  */
  const color = (value) => {
    if (!value) return ''

    switch (value[0]) {
      case 'A':
        return 'orange'
      case 'B':
        return 'pink.300'
      case 'C':
        return '#3ab73a'
      case 'D':
        return 'blue.400'
      case 'E':
        return 'purple.600'
      case 'F':
        return '#8695e2'
      case 'G':
        return 'gray'
    }
  }

  return (
    <Text fontWeight="bold" color={color(value)} fontSize="lg">
      {value}
    </Text>
  )
}

export default Status