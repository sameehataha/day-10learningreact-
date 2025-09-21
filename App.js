import React from "react"
import Die from "./Die"
import "./style.css"
import { nanoid } from 'nanoid';
import Confetti from "react-confetti"
export default function App() {
  const [dice, setDice] = React.useState(allNewDice())
   const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue){
        setTenzies(true)
      }
    }, [dice])

  function newgenerateDice(){
    const randomNumber = Math.floor(Math.random() * 6) + 1
    return {
            value: randomNumber,
            isHeld: false,
            id: nanoid()
          }
    }
  
    function allNewDice(){
       let diceNumber = []
       for(let i=0;i<10;i++){
          diceNumber.push(newgenerateDice())
       }
       return diceNumber 
    } 

    function rollDice(){
      if (!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : newgenerateDice()
      }))
    }else {
      setTenzies(false)
      setDice(allNewDice())
    }
    }
    function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ?
        {...die, isHeld: !die.isHeld} : die
      }))
    }

    const diceNumbers = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

    return (
        <main>
            {tenzies && <Confetti width={window.screen.width} height={window.screen.height}/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
            {diceNumbers}
            </div>
            <button onClick ={rollDice} className="btn">{tenzies ? "New Game" : "Roll Dice🎲"}</button>
        </main>
    )
  }
