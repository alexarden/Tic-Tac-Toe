import { useEffect, useState } from 'react'
import './App.css'
import style from './style.module.scss';

//TODO: Add end game logic and score system.
const O = <img src="src\assets\o.png" alt="Green circle" width="100" height="100"></img>  
const X = <img src="src\assets\x.png" alt="Red X" width="100" height="100"></img>  

function App() {
  const [player, setPlayer] : any = useState(X); 
  const [XScore, setXScore] = useState(0);
  const [OScore, setOScore] = useState(0);
  const [game, setGame] : any = useState([['', '', ''], ['', '', ''], ['', '', '']]);
  const [gameOver, setGameOver] = useState(false)   
  const [winner, setWinner] = useState('X') 

  useEffect(() => {
    isGameOver()
  }) 

  function handleClick(e:any) {    
   let row = Number(e.target.classList[1].substring(4,5));  
   let col = Number(e.target.classList[2].substring(4,5));
   if(game[row][col] === ''){ 
    setGame((game:any)=> { 
      game[row][col] = player 
      setPlayer(player === X ? O : X)
      return game  
    }); 
   } 
  }

  function isGameOver(){ 
    for(let i = 0; i< game.length; i++){
      if(game[i].every((box: any) => box === X)){
        xWon()  
      }else if(game[i].every((box: any) => box === O)){
        oWon()
        setGameOver(gameOver => gameOver = true)
      }else if(game[0][i] === X && game[1][i] === X && game[2][i] === X){ 
        xWon()
      }else if(game[0][i] === O && game[1][i] === O && game[2][i] === O){ 
        oWon()
      }else if(game[0][0] === X && game[1][1] === X && game[2][2] === X || game[0][2] === X && game[1][1] === X && game[2][0] === X){
        xWon()
        break
      }else if(game[0][0] === O && game[1][1] === O && game[2][2] === O || game[0][2] === O && game[1][1] === O && game[2][0] === O){ 
        oWon()
        break 
      } 
    }
  }

  function xWon(){
    setXScore(prevScore => prevScore + 1)
    setGame((game: any) => game = [['', '', ''], ['', '', ''], ['', '', '']]) 
    setPlayer((player: any) => player = X)
    setWinner(winner => winner = 'X')
    setGameOver(gameOver => gameOver = true)
  }

  function oWon(){
    setOScore(prevScore => prevScore + 1)
    setGame((game: any) => game = [['', '', ''], ['', '', ''], ['', '', '']])
    setPlayer((player: any) => player = X)
    setWinner(winner => winner = 'O') 
    setGameOver(gameOver => gameOver = true) 
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
        <div style={{width: '50'}}>{<img src="./assets/x.png" alt="Green circle" width="20" height="20"></img>   }  {XScore}</div>   
        <div style={{width: '50'}}>{<img src="./assets/o.png" alt="Green circle" width="20" height="20"></img>   }  {OScore}</div>     
      </div>
    { renderGame() }  
    </div>
  )
}

export default App
