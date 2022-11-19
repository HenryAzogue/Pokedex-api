import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PokemonDetail = () => {
  const [detailsPoke, setDetailsPoke] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setDetailsPoke(res.data))
  }, [id]);

  // console.log(detailsPoke);

  return (
    <div className='detail'>
      <h2>Pokemon details</h2>
      <img src={detailsPoke.sprites?.other.dream_world.front_default} alt={detailsPoke.name} loading="lazy" />
      <p>{detailsPoke.name}</p>
      <p>Weight {detailsPoke.weight}</p>
      <p>Height {detailsPoke.height}</p>
      <div>
        <h2>Type</h2>
        <ul>
          {
            detailsPoke.types?.map((typePoke) => (
            <li key={typePoke.type.url}>
              <p>{typePoke.type.name}</p>
            </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetail;