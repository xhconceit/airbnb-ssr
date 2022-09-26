const fs = require('fs')
const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')

async function createServer () {
  const app = express()

  app.use(serveStatic(path.resolve(__dirname, 'dist/client'), { index: false }))

  app.use('*', async (req, res) => {
    const url = req.originalUrl
    console.log(url)
    try {
      // 1. 读取 index.html
      const template = fs.readFileSync(
        path.resolve(__dirname, 'dist/client/index.html'),
        'utf-8'
      )

      // 3. 加载服务器入口
      const render = (await import('./dist/server/entry-server.js')).render

      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了适当的 SSR 框架 API。
      //    例如 ReactDOMServer.renderToString()
      const manifest = require('./dist/client/ssr-manifest.json')
      const { appHtml, state, preloadLinks = '' } = await render(url, manifest)

      const { roomDetail } = state
      const { title: roomTitle, owner } = roomDetail || {}
      const { introduce = '' } = owner || {}
      const { meta } = state.route
      const { title, keywords, description } = meta
      // 5. 注入渲染后的应用程序 HTML 到模板中。
      const html = template
        .replace('<title>', `<title>${title} ${roomTitle}`)
        .replace('<meta name="keywords" content="">', `<meta name="keywords" content="${keywords} ${introduce}">`)
        .replace('<meta name="description" content="">', `<meta name="description" content="${description} ${introduce}">`)
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('\'<!--vuex-state-->\'', JSON.stringify(state))

      // 6. 返回渲染后的 HTML。
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // 如果捕获到了一个错误，让 Vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(4000, () => {
    console.log('node ssr server http://localhost:4000/')
  })
}

createServer()
