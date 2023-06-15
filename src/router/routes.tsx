import {
  CalendarCheck,
  ChartPie,
  ClipboardText,
  House,
  Money,
  Swap,
  Tag,
} from 'phosphor-react'
import {
  Categories,
  Home,
  Login,
  PaymentMethods,
  Recurrences,
  Summary,
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
    label: 'Resumo',
    path: '/summary',
    element: <Summary />,
    icon: <ClipboardText />,
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
