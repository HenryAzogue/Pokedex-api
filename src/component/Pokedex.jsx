import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';

/**https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154
paginacion: todos los pokemon
*/
const Pokedex = () => {
  const userName = useSelector((state) => state.name);
  const [pokemons, setPokemons] = useState([]);
  const [pokeName, setPokeName] = useState("");
  const [pokeType, setPokeType] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/")
      .then((res) => setPokemons(res.data.results));

    axios.get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokeType(res.data.results));
  }, []);

  console.log(pokeType);

  const searchPokemon = () => {
    navigate(`/pokedex/${pokeName.toLowerCase()}`)
  }

  // console.log(pokemon);
  return (
    <div className='pokedex'>
      <header className="pokedex__header">
        <h2 className='header__h2'>Pokedex</h2>
        <p className='header__p'>Welcome {userName}!</p>
      </header>
      <div>
        <input
          type="text"
          placeholder='Search pokemon'
          value={pokeName}
          onChange={(e) => setPokeName(e.target.value)}
        />
        <button onClick={searchPokemon}>Search</button>

        <select name="All Pokemon" id="">
          {
            pokeType.map((type)=>(
              
              <option key={type.url} value="">{type.name}</option>
              
            ))
          }
        </select>
      </div>
        <ul className='pokedex__ul'>
          {
            pokemons.map((pokemon) => (
              <PokemonCard url={pokemon.url} />
            ))
          }
        </ul>
    </div>
  );
};

export default Pokedex;