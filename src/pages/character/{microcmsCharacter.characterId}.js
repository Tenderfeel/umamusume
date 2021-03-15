import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const CharacterPage = ({ data }) => (
  <Layout>
    <SEO title={data.microcmsCharacter.name} />
    <h1>{data.microcmsCharacter.name}</h1>
    <h2>適性</h2>
    <table>
      <tbody>
        <tr>
          <th scope="row">バ場適性</th>
          <td>
            {data.microcmsCharacter.surface.turf}
            <hr />
            芝
          </td>
          <td>
            {data.microcmsCharacter.surface.dart}
            <hr />
            ダート
          </td>
        </tr>
        <tr>
          <th scope="row">距離適性</th>
          <td>
            {data.microcmsCharacter.distance.short}
            <hr />
            短距離
          </td>
          <td>
            {data.microcmsCharacter.distance.mile}
            <hr />
            マイル
          </td>
          <td>
            {data.microcmsCharacter.distance.middle}
            <hr />
            中距離
          </td>
          <td>
            {data.microcmsCharacter.distance.long}
            <hr />
            長距離
          </td>
        </tr>
        <tr>
          <th scope="row">脚質適性</th>
          <td>
            {data.microcmsCharacter.running.escape}
            <hr />
            逃げ
          </td>
          <td>
            {data.microcmsCharacter.running.ahead}
            <hr />
            先行
          </td>
          <td>
            {data.microcmsCharacter.running.forerunner}
            <hr />
            差し
          </td>
          <td>
            {data.microcmsCharacter.running.pursuer}
            <hr />
            追込
            </td>
        </tr>
      </tbody>
    </table>

    <h2>成長率</h2>
    <table>
      <tbody>
        <tr>
          <th scope="col">スピード</th>
          <th scope="col">スタミナ</th>
          <th scope="col">パワー</th>
          <th scope="col">根性</th>
          <th scope="col">賢さ</th>
        </tr>
        <tr>
          <td>{data.microcmsCharacter.growthRate.speed || 0}%</td>
          <td>{data.microcmsCharacter.growthRate.stamina || 0}%</td>
          <td>{data.microcmsCharacter.growthRate.power || 0}%</td>
          <td>{data.microcmsCharacter.growthRate.guts || 0}%</td>
          <td>{data.microcmsCharacter.growthRate.int || 0}%</td>
        </tr>
      </tbody>
    </table>

    <h2>スキル</h2>
    <table>
      <thead>
        <tr>
          <th scope="col">覚醒Lv</th>
          <th scope="col">スキル名/効果</th>
          <th scope="col">Pt</th>
        </tr>
      </thead>
      <tbody>
      {data.microcmsCharacter.skills.map(({ awakeLv, skill }) => (
        <tr key={skill.id}>
          <td>{awakeLv}</td>
          <td>
            <Link to={`/skill/${skill.id}`}>{skill.name}</Link>
            <p>{skill.description}</p>
          </td>
          <td>
            {skill.point}
          </td>
        </tr>
      ))}
      </tbody>
    </table>
  </Layout>
)

export default CharacterPage

export const query = graphql`
  query {
    microcmsCharacter {
        name
        rare
        surface {
          dart
          turf
        }
        skills {
          awakeLv
          skill {
            id
            name
            point
            rare
            trigger
            uniqe
            description
          }
        }
        running {
          ahead
          escape
          pursuer
          forerunner
        }
        growthRate {
          int
          speed
        }
        distance {
          long
          middle
          mile
          short
        }
        birthDay {
          day
          month
        }
        characterId
      }
  }
`