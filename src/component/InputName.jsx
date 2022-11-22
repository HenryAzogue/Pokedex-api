import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getName } from '../store/slices/name.slice';
import image from '../assets/imageP';

const InputName = () => {
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterName = () => {
    dispatch(getName(userName));
    navigate("/pokedex");
  }

  return (
    <div className='start'>
      <img
        className='start__img'
        src={image.img}
        alt="entrenadores pokemon"
        loading='lazy'
      />
      <h1 className='start__h1'>Enter your name to get starded</h1>
      <div className="start__div">
        <input
          className='div__input'
          type="text"
          onChange={e => setUserName(e.target.value)}
          value={userName}
        />
        <button
          className='div__btn'
          onClick={enterName}>
          Enter
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default InputName;