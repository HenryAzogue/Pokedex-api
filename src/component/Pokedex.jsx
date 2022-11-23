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
  const pokemonPerPage = 10;                                                 //10
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
        <img className='header__img' src={image.img_background} alt="wallpapwe logo" loading='lazy' />
      </header>

      <section className='pokedex__section'>
        <h2 className='section__h2'>
          Welcome {userName}! here you can find your favorite pokemons
        </h2>
        <div className="section__div">
          <div className='div__search'>
            <input
              className='div__input'
              type="text"
              placeholder='Search pokemon by name or id'
              value={pokeName}
              onChange={(e) => setPokeName(e.target.value)}
            />
            <button
              className='div__btn'
              onClick={searchPokemon}
            >
              Search
            </button>
          </div>
          <select
            className='div__select'
            onChange={filterType} name="" id="">
            {
              pokeType.map((type) => (
                <option
                  className='select__option'
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
          <ul className='pagination__ul'>
            <button
              className='ul__btn'
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <i className="fa-solid fa-caret-left"></i>
            </button>

            {
              numbers.map((number) => (
                <li className='ul__li' key={number}>
                  <button
                    className='li__btn'
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))
            }
            <button
              className='ul__btn'
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <i className="fa-solid fa-caret-left"></i>
            </button>
          </ul>
        </div>

      </section>
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