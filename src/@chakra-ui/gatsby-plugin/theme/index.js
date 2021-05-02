import { extendTheme } from "@chakra-ui/react"

// Component style overrides
import * as Table from "./components/table"

const overrides = {
  fontSizes: {
    xxs: "0.65rem",
  },
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