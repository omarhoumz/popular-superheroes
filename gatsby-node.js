const fetch = require(`node-fetch`)

const DC_HEROES_NODE_TYPE = 'DcHeroes'
// const MARVEL_HEROES_NODE_TYPE = 'MarvelHeroes'

const YOUR_PROJECT_ID = 'popular-superheroes'
const DATA_CENTER_REGION = 'us-central1'

const functionsBaseEndpoint = `https://${DATA_CENTER_REGION}-${YOUR_PROJECT_ID}.cloudfunctions.net`
// const functionsBaseEndpoint =
//   process.env.NODE_ENV === 'production'
//     ? `https://${DATA_CENTER_REGION}-${YOUR_PROJECT_ID}.cloudfunctions.net`
//     : `http://localhost:5001/${YOUR_PROJECT_ID}/${DATA_CENTER_REGION}`

const getHeroesFunction = `${functionsBaseEndpoint}/getDcHeroes`

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
  createNodeId,
}) => {
  const dcResult = await fetch(getHeroesFunction)

  const dcHeroes = await dcResult.json()

  dcHeroes.forEach((hero) =>
    createNode({
      ...hero,
      id: createNodeId(`${DC_HEROES_NODE_TYPE}-${hero.id}`),
      parent: null,
      children: [],
      internal: {
        type: DC_HEROES_NODE_TYPE,
        content: JSON.stringify(hero.name),
        contentDigest: createContentDigest(hero),
      },
    }),
  )

  // const marvelResult = await fetch(
  //   'http://localhost:5001/popular-superheroes/us-central1/getMarvelHeroes',
  // )

  // const marvelHeroes = await marvelResult.json()

  // marvelHeroes.forEach((hero) =>
  //   createNode({
  //     ...hero,
  //     id: createNodeId(`${MARVEL_HEROES_NODE_TYPE}-${hero.id}`),
  //     parent: null,
  //     children: [],
  //     internal: {
  //       type: MARVEL_HEROES_NODE_TYPE,
  //       content: JSON.stringify(hero.name),
  //       contentDigest: createContentDigest(hero),
  //     },
  //   }),
  // )
}
