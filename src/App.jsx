import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import FavorietenPage from './pages/FavorietenPage.jsx'
import DetailPage from './pages/DetailPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<FavorietenPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
