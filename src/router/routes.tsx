import {
  CalendarCheck,
  ChartPie,
  ClockCounterClockwise,
  House,
  Money,
  Swap,
  Tag,
} from 'phosphor-react'
import {
  Categories,
  History,
  Home,
  Login,
  PaymentMethods,
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
    label: 'Início',
    path: '/',
    element: <Home />,
    icon: <House />,
  },
  {
    label: 'Histórico',
    path: '/history',
    element: <History />,
    icon: <ClockCounterClockwise />,
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
  {
    label: 'Meios de pagamento',
    path: '/payment-methods',
    element: <PaymentMethods />,
    icon: <Money />,
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
