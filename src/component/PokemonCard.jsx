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
    <Link to={`/pokedex/${pokeCard.id}`}>
      <p>{pokeCard.name}</p>
      <img src={pokeCard.sprites?.front_default} alt="" />
    </Link>
  );
};

export default PokemonCard;