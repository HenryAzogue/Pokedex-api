import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import image from '../assets/imageP';
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
      .then((res) => setPokemons(res.data.results))
      .catch(error => console.log(error));

    axios.get("https://pokeapi.co/api/v2/type/")
      .then((res) => setPokeType(res.data.results))
      .catch(error => console.log(error));
  }, []);


  const searchPokemon = () => {
    navigate(`/pokedex/${pokeName.toLowerCase()}`)
  }

  const filterType = (e) => {
    const url = e.target.value;
    axios.get(url)
      .then((res) => setPokemons(res.data.pokemon))
      .catch(error => console.log(error));
  }

  //pagination
  const [page, setPage] = useState(1);                                     //1
  const pokemonPerPage = 5;                                                 //10
  const lastIndex = page * pokemonPerPage;                                  //L:1*10 = 10
  const firstIndex = lastIndex - pokemonPerPage;                            //FI: L-10= 0
  const pokemonPagination = pokemons.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(pokemons.length / pokemonPerPage);    //

  const numbers = [];
  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i);
  }
  

  return (
    <div className='pokedex'>
      <header className="pokedex__header">
        <img className='header__img' src={image.img_logo} alt="" />
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

        <select onChange={filterType} name="" id="">
          {
            pokeType.map((type) => (
              <option
                value={type.url}
                key={type.name}
              >
                {type.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className="div_pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <i className="fa-solid fa-circle-arrow-left"></i>
        </button>
        <ul>
          {
            numbers.map((number) => (
              <li key={number}>
                <button onClick={() => setPage(number)}
                  href="!#">
                  {number}
                </button>
              </li>
            ))
          }
        </ul>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <i className="fa-solid fa-circle-arrow-right"></i>
        </button>
      </div>

      <ul className='pokedex__ul'>
        {
          pokemonPagination?.map((pokemon) => (
            <PokemonCard
              url={pokemon.url ? pokemon.url : pokemon.pokemon?.url}
              key={pokemon.url ? pokemon.url : pokemon.pokemon?.url} />
          ))
        }
      </ul>

    </div>
  );
};

export default Pokedex;