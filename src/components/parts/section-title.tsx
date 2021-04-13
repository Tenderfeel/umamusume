import React from "react"
import { Heading} from "@chakra-ui/react"

interface SectionTitleProps {
  mt?: string,
  mb?: string,
  children: React.ReactNode
}

const SectionTitle = (props: SectionTitleProps) => {
  return (
    <Heading 
      {...props}
      size="sm"
      mt="6"
      mb="3"
      px="2"
      py="1"
      borderLeft="solid 5px"
      borderBottom="solid 1px"
      borderColor="teal"
    >{props.children}</Heading>
  )
}

export default SectionTitle