import React, { memo } from 'react'

import style from './hero.module.css'

const Hero = memo(function Hero({ name, link, img }) {
  return (
    <li className={style.hero}>
      <h4>{name}</h4>
      <a href={link} target='_blank' rel='nooperner noreferrer'>
        Read more{name && ` about ${name}`}
      </a>
      <img src={img} alt={name} />
    </li>
  )
})

export default Hero
