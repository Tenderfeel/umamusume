/**
 * レースindex用filter
 */
import React from "react"
import {
  HStack,
  Select,
  useColorModeValue
} from "@chakra-ui/react"
import { useStaticQuery, graphql } from "gatsby"

// コースセレクトメニュー
const CouseSelect = () => {
  const { racecourses } = useStaticQuery(
    graphql`
      query {
        racecourses: allMicrocmsRacecourse {
          nodes {
            shortName,
            racecourseId
          }
        }
      }
    `
  )
  
  return (
    <Select placeholder="競馬場">
    {
      racecourses.nodes.map(({shortName, racecourseId}) => (
        <option key={racecourseId}>{shortName}</option>
      ))
    }
    </Select>
  )
}

// 距離セレクトメニュー
const DistanceSelect = () => {
  return (
    <Select placeholder="距離">
      <option>短距離</option>
      <option>マイル</option>
      <option>中距離</option>
      <option>長距離</option>
    </Select>
  )
}

// 開催時期
const SeasonSelect = () => {
  return (
    <Select placeholder="開催時期">
    {
      new Array(24).fill(null).map((v, index) => {
        const label = Math.floor(index / 2) + 1
        const period = index % 2 ? '後半' : '前半'
        let season = '冬'
        if ([3, 4, 5].includes(label)) {
          season = '春'
        } else if ([6, 7, 8].includes(label)) {
          season = '夏'
        } else if ([9, 10, 11].includes(label)) {
          season = '秋'
        }

        return (
          <option key={index}>{label}月{period}（{season}）</option>
        )
      })
    }
    </Select>
  )
}

const RaceFilter = (props) => {
  return (
    <HStack {...props}>
      <SeasonSelect />
      <CouseSelect />
      <DistanceSelect />
    </HStack>
  )
}

export default RaceFilter