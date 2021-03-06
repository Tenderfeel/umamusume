
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `ウマ娘DB`,
    description: `相性のいいカードとか見れたら便利やろなと思って作ってみたツール`,
    author: `@Tenderfeel`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/
        }
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ウマ娘DB`,
        short_name: `ウマ娘DB`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    // microCMS
    {
      resolve: "gatsby-source-microcms",
      options: {
        apiKey: process.env.API_KEY,
        serviceId: "umamusume",
        apis: [
          {
            // ウマ娘
            endpoint: "character",
          },
          {
            // スキル
            endpoint: "skill"
          },
          {
            // サポートカード
            endpoint: "support-card"
          },
          {
            // 競馬場
            endpoint: "racecourse"
          },
          {
            // レース
            endpoint: "race"
          },
          {
            // 因子
            endpoint: "factor"
          },
          {
            // 育成目標
            endpoint: "goals"
          },
          {
            endpoint: "mission"
          }
        ],
      },
    },
    // charkra
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [isResettingCSS=true]
         * if `false`, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if `false`, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
        /**
         * @property {number} [portalZIndex=40]
         * The z-index to apply to all portal nodes. This is useful
         * if your app uses a lot z-index to position elements.
         */
        portalZIndex: 40,
      },
    },

    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@/src": "src",
          "@/util": "src/util/",
          "@/components": "src/components",
          // "@/layouts": "src/layouts",
          "@/pages": "src/pages",
          "@/templates": "src/templates",
          "@/images": "src/images"
        },
        extensions: [
          "js", "tsx", "ts"
        ],
      }
    }
  ],
}
