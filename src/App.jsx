import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import InputName from './component/InputName'
import PokemonDetail from './component/PokemonDetail'
import Pokedex from './component/Pokedex'
import ProtectedRoutes from './component/ProtectedRoutes'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<InputName />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokemonDetail />}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
