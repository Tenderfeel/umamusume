/**
 * レースindex用filter
 */
import React from "react"
import {
  HStack, SimpleGrid,
  Select,
  CheckboxGroup, Checkbox,
  useColorModeValue
} from "@chakra-ui/react"
import { useStaticQuery, graphql } from "gatsby"
import { Grades } from '@/util/'

// コースセレクトメニュー
const CouseSelect = ({ onCourseChange }) => {
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
    <Select placeholder="競馬場" size="sm" onChange={(e) => {
      onCourseChange(e.target.value)
    }}>
    {
      racecourses.nodes.map(({shortName, racecourseId}) => (
        <option key={racecourseId}>{shortName}</option>
      ))
    }
    </Select>
  )
}

// 出走資格セレクトメニュー
const QualificationSelect = ({ onQualificationChange }) => {
  return (
    <Select placeholder="出走資格" size="sm" onChange={(e) => {
      onQualificationChange(e.target.value)
    }}>
      <option>ジュニア</option>
      <option>クラシック</option>
      <option>シニア</option>
    </Select>
  )
}

// 距離セレクトメニュー
const DistanceSelect = ({ onDistanceChange }) => {
  return (
    <Select placeholder="距離" size="sm" onChange={(e) => {
      onDistanceChange(e.target.value)
    }}>
      <option>短距離</option>
      <option>マイル</option>
      <option>中距離</option>
      <option>長距離</option>
    </Select>
  )
}

// 開催時期
const SeasonSelect = ({ onSeasonChange }) => {

  return (
    <Select placeholder="開催時期" size="sm" onChange={(e) => {
      onSeasonChange(e.target.value)
    }}>
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

const GradeSelect = ({ grade, onGradeChange }) => {

  return (
    <CheckboxGroup>
       <SimpleGrid columns={[3, 5]} p="2">
       {
            Grades.map(g => (
              <Checkbox key={g}
              name={g}
              onChange={(e) => onGradeChange(
                e.target.checked ? 
                    [ ...grade, e.target.name ]
                    : grade.filter(i => i !== e.target.name)
              )}>{g}</Checkbox>
            ))
          }
       </SimpleGrid>
    </CheckboxGroup>
  )
}

export  {
  SeasonSelect,
  CouseSelect,
  DistanceSelect,
  QualificationSelect,
  GradeSelect
}