import React, { memo } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import Heroes from '../components/ui/heroes/heroes'

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
        totalCount
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
