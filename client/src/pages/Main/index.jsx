import React from 'react';
import './Main.scss';
import NavLink from 'react-router-dom/NavLink';
import TextBookCard from '../../components/TextBookCard/TextBookCard';

export default function Main() {
  return (
    <div>
      <TextBookCard />
      <NavLink to="/game">game</NavLink>
    </div>
  );
}
