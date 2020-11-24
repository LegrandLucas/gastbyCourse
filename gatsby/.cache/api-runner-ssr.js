var plugins = [{
      plugin: require('/Users/lucas/code/wes_bos/gatsbyPizza/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/lucas/code/wes_bos/gatsbyPizza/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"zj8ljnw5","dataset":"production","watchMode":true,"token":"skPr1OoBIZ69POt20KA9ejLtwQWWQ9Olg8m3K0vDSiv2Xpeq6xUs7jlHr6bEEHm4NXiIfIW85JdppJ7kptXdy2XwNwBMsAbeLE7g1yHhwapECnEiXzVOwGajMELDU98r8hGMuqEzguujqPP7aTvemD0xeLeKIAFsWxQAmyRu8i4mMSZM8Fzr"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
