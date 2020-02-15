
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/Index.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('pages/Index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Auth/login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
