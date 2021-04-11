import { extendTheme } from "@chakra-ui/react"

// Component style overrides
import Table from "./components/table"

const overrides = {
  variants: {},
  components: {
    Table,

    Text: {
      variants: {
        skill: {
          fontWeight: 'bold',
          color: 'var(--chakra-colors-orange-300)'
        }
      }
    }
  },
}
export default extendTheme(overrides)