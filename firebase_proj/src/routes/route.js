// All components mapping with path for internal routes

import { lazy } from 'react'


const Dashboard = lazy(() => import('../components/Dashboard/index'))
const Menu = lazy(() => import('../components/Menu/index'))
const MenuCreate = lazy(() => import('../components/Menu/Create'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/menu', // the url
    component: Menu, // view rendered
  },
  {
    path: 'menu/create',
    component: MenuCreate
  }
]

export default routes