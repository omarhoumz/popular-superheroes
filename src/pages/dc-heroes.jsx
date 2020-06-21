import React, { memo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Heroes from '../components/ui/heroes/heroes'
import SEO from '../components/seo'

const DcHeroes = memo(function DcHeroes() {
  const data = useStaticQuery(graphql`
    query dcHeroes {
      allDcHeroes {
        edges {
          node {
            id
            name
            img
            link
          }
        }
      }
    }
  `)

  return (
    <main
      style={{
        height: '100vh',
        backgroundColor: '#232427',
      }}
    >
      <SEO title='DC Heroes' />

      <h1
        style={{
          marginBlockStart: 0,
          paddingInlineStart: '1em',
          paddingBlockStart: '1em',
          color: 'var(--blue-100, white)',
        }}
      >
        DC Heroes
      </h1>

      <Heroes heroes={data.allDcHeroes.edges.map((n) => n.node)} />

      {/* <h4>
        https://firebasestorage.googleapis.com/v0/b/popular-superheroes.appspot.com/o/dc-heroes%2Fdc-heroes.png?alt=media&token=dfceafd3-7f33-46b6-afab-3a2dc29215eb
      </h4> */}

      {/* <form action='' method='post'>
        name
      </form> */}
    </main>
  )
})

DcHeroes.propTypes = {}

export default DcHeroes
