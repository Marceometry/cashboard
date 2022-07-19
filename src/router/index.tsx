import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CustomRoute } from './components'
import { routes } from './routes'

export * from './routes'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <CustomRoute isPublic={route.isPublic}>
                {route.element}
              </CustomRoute>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
