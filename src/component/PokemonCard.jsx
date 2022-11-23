import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ url }) => {
  const [ pokeCard, setPokeCard ] = useState({});

  useEffect(() => {
    axios.get(url)
        .then((res) => setPokeCard(res.data));
  },[]);

  // console.log(pokeCard);
  return (
    <div className='card'>   
    <Link className="div__card" to={`/pokedex/${pokeCard.id}`}>
  
        <img 
          className='card__img'
          src={pokeCard.sprites?.front_default} alt="Pokemon" />
        <h2 className='card__name'>{pokeCard.name}</h2>

    </Link>
    </div>
  );
};

export default PokemonCard;