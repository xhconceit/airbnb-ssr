import { createApp, asyncDataFilter } from './main'
import airbnb from './db'

const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.userObjectStore,
    ...airbnb.orderObjectStore,
    ...airbnb.recordObjectStore
  }).then((res: any) => {
    console.log('初始化所有对象库', res)
    localStorage.getItem('userId') && store.commit('setUserStatus', 1)
    next()
  })
})

router.isReady().then(() => {
  console.log('hello world')
  router.beforeResolve((to, form, next) => {
    const toComponents = router.resolve(to).matched.flatMap(record => Object.values(record.components))
    const formComponents = router.resolve(form).matched.flatMap(record => Object.values(record.components))

    console.log('----to-----')
    console.log(toComponents)
    console.log('====form====')
    console.log(formComponents)

    const actived = toComponents.filter((c, i) => {
      return formComponents[i] !== c
    })
    console.log('=====actived====')
    console.log(actived)
    if (!actived.length) {
      return next()
    }
    asyncDataFilter(actived, store, router.currentRoute).then(() => {
      next()
    })
  })
  app.mount('#app')
})

router.afterEach((to, form, next) => {
  const { roomDetail } = store.state
  const { title: roomTitle, owner } = roomDetail || {}
  const { introduce = '' } = owner || {}
  const { meta } = to
  const { title, keywords, description } = meta
  if (title) {
    document.title = `${title} ${roomTitle}`
  }

  document.querySelector('meta[name="keywords"]')?.setAttribute('content', `${keywords} ${introduce}`)
  document.querySelector('meta[name="description"]')?.setAttribute('content', `${description} ${introduce}`)
})
