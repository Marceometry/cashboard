import { ChartPie, House, Swap } from 'phosphor-react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Categories, Home, Transactions } from './pages'

export const routes = [
  {
    label: 'Home',
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
    label: 'Categorias',
    path: '/categories',
    element: <Categories />,
    icon: <ChartPie />,
  },
]

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
