import React, { memo } from 'react'

import style from './heroes.module.css'
import Hero from './hero'

const Heroes = memo(function Heroes({ heroes }) {
  return (
    heroes.length > 0 && (
      <ul className={style.heroes}>
        {heroes.map((hero, index) => (
          <Hero key={hero.id || index.toString()} {...hero} />
        ))}
      </ul>
    )
  )
})

export default Heroes
