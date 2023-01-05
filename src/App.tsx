import { useEffect, useState } from 'react'
import './App.css'
import style from './style.module.scss';

//TODO: Add end game logic and score system.

function App() {
  const [player, setPlayer] = useState('X');
  const [XScore, setXScore] = useState(0);
  const [OScore, setOScore] = useState(0);
  const [game, setGame] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [gameOver, setGameOver] = useState(true)  

  useEffect(() => {
    isGameOver()
  }) 

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

  function isGameOver(){
    for(let i = 0; i< game.length; i++){
      if(game[i].every(box => box === 'X')){
        setXScore(prevScore => prevScore += 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
      }else if(game[i].every(box => box === 'O')){
        setOScore(prevScore => prevScore += 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
      }else if(game[0][i] && game[1][i] && game[2][i] === 'X'){
        setXScore(prevScore => prevScore += 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
      }else if(game[0][i] && game[1][i] && game[2][i] === 'O'){
        setOScore(prevScore => prevScore += 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
      } 
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

    gameOver ? 
    
      <div>
      <div className={style.gameOver}>Game Over</div>
      <button className={style.newGameButton}>Again!</button>
      </div>

    
    :

    <div className="App">
      <div className={style.scoreBoard}>
        <div>X : {XScore}</div>
        <div>O : {OScore}</div> 
      </div>
    { renderGame() }
    </div>
  )
}

export default App
