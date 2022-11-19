import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PokemonCard from './PokemonCard';

/**https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154
paginacion: todos los pokemon
*/
const Pokedex = () => {
  const userName = useSelector((state) => state.name);

  const [ pokemons, setPokemons ] = useState([]);

  useEffect (()=>{
    axios.get("https://pokeapi.co/api/v2/pokemon/")
        .then((res) => setPokemons(res.data.results));
  },[]);

  // console.log(pokemon);
  return (
    <div className='pokedex'>
      <header className="pokedex__header">
        <h2 className='header__h2'>Pokedex</h2>
        <p className='header__p'>Welcome { userName}!</p>
      </header>
      <ul className='pokedex__ul'>
        {
          pokemons.map((pokemon) =>(
                <PokemonCard url={pokemon.url} />              
          ))
        }
      </ul>
    </div>
  );
};

export default Pokedex;