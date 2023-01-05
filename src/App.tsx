import { useEffect, useState } from 'react'
import './App.css'
import style from './style.module.scss';

//TODO: Add end game logic and score system.

function App() {
  const [player, setPlayer] = useState('X');
  const [XScore, setXScore] = useState(0);
  const [OScore, setOScore] = useState(0);
  const [game, setGame] = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [gameOver, setGameOver] = useState(false)   
  const [winner, setWinner] = useState('X') 

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
    console.log(game); 
    
    for(let i = 0; i< game.length; i++){
      if(game[i].every(box => box === 'X')){
        setXScore(prevScore => prevScore + 1) 
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
        setPlayer(player => player = 'X')
        setWinner(winner => winner = 'X')
        setGameOver(gameOver => gameOver = true) 
      }else if(game[i].every(box => box === 'O')){
        setOScore(prevScore => prevScore + 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
        setPlayer(player => player = 'X')
        setWinner(winner => winner = 'O')
        setGameOver(gameOver => gameOver = true)
      }else if(game[0][i] === 'X' && game[1][i] === 'X' && game[2][i] === 'X'){ 
        setXScore(prevScore => prevScore + 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
        setPlayer(player => player = 'X')
        setWinner(winner => winner = 'X')
        setGameOver(gameOver => gameOver = true)
      }else if(game[0][i] === 'O' && game[1][i] === 'O' && game[2][i] === 'O'){ 
        setOScore(prevScore => prevScore + 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']]) 
        setPlayer(player => player = 'X')
        setWinner(winner => winner = 'O')
        setGameOver(gameOver => gameOver = true)
      }else if(game[0][0] === 'X' && game[1][1] === 'X' && game[2][2] === 'X' || game[0][2] === 'X' && game[1][1] === 'X' && game[2][0] === 'X'){
        setXScore(prevScore => prevScore + 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']]) 
        setPlayer(player => player = 'X')
        setWinner(winner => winner = 'X')
        setGameOver(gameOver => gameOver = true)
        break
      }else if(game[0][0] === 'O' && game[1][1] === 'O' && game[2][2] === 'O' || game[0][2] === 'O' && game[1][1] === 'O' && game[2][0] === 'O'){
        setOScore(prevScore => prevScore + 1)
        setGame(game => game = [['', '', ''], ['', '', ''], ['', '', '']])
        setPlayer(player => player = 'X')
        setWinner(winner => winner = 'O') 
        setGameOver(gameOver => gameOver = true) 
        break 
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

  function handleAgainClick(){
    setGameOver(gameOver => gameOver = false); 
  }

  return (

    gameOver ? 
    
      <div>
      <div className={style.gameOver}>Game Over</div>
      <div className={style.winner}>{winner} Won!</div> 
      <button className={style.newGameButton} onClick={handleAgainClick}>Again!</button>
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
