import React, { useContext } from 'react'
import GameContext from '../../game-main/GameContext';

function IncreaseButton() {

var btnIncrease = useContext(GameContext);


  return (
    <div><button type="button" onClick={btnIncrease.clickIncrease}>Tıkla</button></div>
  )
}

export default IncreaseButton