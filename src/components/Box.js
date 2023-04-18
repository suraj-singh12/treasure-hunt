import React, { useState } from "react"
import "./Box.css"

const Box = ({ value, onClick }) => {
  const [revealed, setRevealed] = useState(false)

  const handleClick = () => {
    setRevealed(true)
    onClick()
  }

  return (
    <div className={`box ${revealed ? "revealed" : ""}`} onClick={handleClick}>
      {revealed ? <span>{value}</span> : <span>?</span>}
    </div>
  )
}

export default Box
