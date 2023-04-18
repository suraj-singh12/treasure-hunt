import React, { useState, useEffect } from "react"
import "./App.css"
import Box from "./components/Box"

const BOARD_SIZE = 9
const TREASURE_CHANCE = 0.1
const BOMB_CHANCE = 0.3

const App = () => {
  const [board, setBoard] = useState(Array(3).fill(Array(3).fill("?")))
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  useEffect(() => {
    if(gameOver || gameWon) {
      // reload the page
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
    const newBoard = [...board]
    const treasureIndex = Math.floor(Math.random() * BOARD_SIZE)
    newBoard[Math.floor(treasureIndex / 3)][treasureIndex % 3] = "T"

    for (let i = 0; i < BOARD_SIZE; i++) {
      if (i !== treasureIndex) {
        const chance = Math.random()
        if (chance < BOMB_CHANCE) {
          newBoard[Math.floor(i / 3)][i % 3] = "B"
        } else if (chance < TREASURE_CHANCE + BOMB_CHANCE) {
          newBoard[Math.floor(i / 3)][i % 3] = "#"
        }
      }
    }
    if(!gameOver && !gameWon)
      setBoard(newBoard)
  }, [gameOver, gameWon])


  const handleClick = (row, col) => {
    const clickedBox = board[row][col]
    if (clickedBox === "B") {
      setGameOver(true)
    } else if (clickedBox === "T") {
      setGameWon(true)
    } else {
      const newBoard = [...board]
      newBoard[row][col] = clickedBox.toLowerCase()
      setBoard(newBoard)
    }
  }

  return (
    <div className="app-container">
      <h1>Treasure Hunt Game</h1>
      <div className="grid-container">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((value, colIndex) => (
              <Box
                key={colIndex}
                value={value}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      {gameOver && <h2>Game Over! <br/> Reloading..</h2>}
      {gameWon && <h2>You Won! <br/> Reloading..</h2>}
    </div>
  )
}

export default App
