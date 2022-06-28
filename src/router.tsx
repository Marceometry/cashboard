import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Categories, Home, Transactions } from './pages'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/categories' element={<Categories />} />
      </Routes>
    </BrowserRouter>
  )
}
