import { useState } from 'react'
import './App.css'
import style from './style.module.scss';

//TODO: Add end game logic and score system.

function App() {
  const [player, setPlayer] = useState('X');
  const [game, setGame] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  function handleClick(e:any) {    
   let row = Number(e.target.classList[1].substring(4,5));  
   let col = Number(e.target.classList[2].substring(4,5));
   if(game[row][col] === ''){ 
    setGame(game => {
      game[row][col] = player
      setPlayer(player === 'X' ? 'O' : 'X')
      return game  
    }); 
   } 
  }
 
  function renderBox(row:number ,col: number) {
    return <div className={`${style.gameBox} row=${row} col=${col}`}  onClick={e => handleClick(e)}>{game[row][col]}</div>  
  }

  function renderRow(row: number) {
    return <div className={`${style.gameRow} ${row}`}>
      {renderBox(row, 0)}
      {renderBox(row, 1)}
      {renderBox(row, 2)} 
    </div> 
  }

  function renderGame() {
    return <div> 
      {renderRow(0) }{renderRow(1) }{renderRow(2) } 
    </div>
  }

  return (


    <div className="App">
    { renderGame() }
    </div>
  )
}

export default App
