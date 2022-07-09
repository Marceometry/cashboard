import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Categories, Home, Transactions } from './pages'

export const routes = [
  {
    label: 'Home',
    path: '/',
    element: <Home />,
  },
  {
    label: 'Transações',
    path: '/transactions',
    element: <Transactions />,
  },
  {
    label: 'Categorias',
    path: '/categories',
    element: <Categories />,
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
