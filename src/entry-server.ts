import { createApp, asyncDataFilter } from './main'
import { renderToString } from 'vue/server-renderer'
import { ID_INJECTION_KEY } from 'element-plus'

export async function render (url:string, manifest:any) {
  console.log(url)
  const { router, app, store } = createApp()
  app.provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0
  })
  await router.push(url)
  await router.isReady()
  const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))
  console.log('匹配组件', matchedComponents)

  await asyncDataFilter(matchedComponents, store, router.currentRoute)
  const context:any = {}
  const appHtml = await renderToString(app, context)
  console.log('import.meta.env.PROD', import.meta.env.PROD)
  const state = store.state
  if (import.meta.env.PROD) {
    console.log(context)
    const preloadLinks = renderLinks(context.modules, manifest)
    return { appHtml, state, preloadLinks }
  } else {
    return { appHtml, state }
  }
}

function renderLinks (modules: any, manifest: any) {
  let links = ''
  console.log(manifest)
  modules.forEach((id:any) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: string) => {
        links += renderPreloadLinks(file)
      })
    }
  })
  return links
}

function renderPreloadLinks (file:string) :string {
  console.log('-----file', file)
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="styleheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg')) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    return ''
  }
}
