import React from "react"
import { HStack, Badge } from "@chakra-ui/react"

/**
 * Interface of SkillTriggerProps
 */
interface SkillTriggerProps { 
  showTrigger: boolean;
  trigger: string[] 
}

/**
 * スキル発動条件
 */
const SkillTrigger = ({ showTrigger, trigger}: SkillTriggerProps) => {

  if (showTrigger && trigger && trigger.length) {
    return (
      <HStack py="2">
        {
          trigger.map((text: string) => (
            <Badge colorScheme="green" key={text}>{text}</Badge>
          ))
        }
      </HStack>
    )
  }

  return null
}

export default SkillTrigger