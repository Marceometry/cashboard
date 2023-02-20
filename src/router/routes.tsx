import { CalendarCheck, ChartPie, House, Swap, Tag } from 'phosphor-react'
import {
  Categories,
  Home,
  Login,
  Recurrences,
  Tags,
  Transactions,
} from '@/pages'

type Route = {
  path: string
  element: React.ReactNode
  icon?: React.ReactNode
  label?: string
  isPublic?: boolean
}

export const dashboardRoutes: Route[] = [
  {
    label: 'Resumo',
    path: '/',
    element: <Home />,
    icon: <House />,
  },
  {
    label: 'Transações',
    path: '/transactions',
    element: <Transactions />,
    icon: <Swap />,
  },
  {
    label: 'Recorrências',
    path: '/recurrences',
    element: <Recurrences />,
    icon: <CalendarCheck />,
  },
  {
    label: 'Categorias',
    path: '/categories',
    element: <Categories />,
    icon: <ChartPie />,
  },
  {
    label: 'Tags',
    path: '/tags',
    element: <Tags />,
    icon: <Tag />,
  },
]

export const routes: Route[] = [
  {
    path: '/login',
    element: <Login />,
    isPublic: true,
  },
  ...dashboardRoutes,
]
