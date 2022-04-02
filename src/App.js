import React from "react";
import Die from "./Die";
import Confetti from "react-confetti";

export default function App() {
  const min = 1;
  const max = 6;

  function generateAllNewDice() {
    const numDice = 10;
    let allNewDice = [];
    for (let i = 0; i < numDice; i++) {
      let randomNum = Math.floor(min + Math.random() * (max + 1 - min));
      allNewDice.push({
        value: randomNum,
        on: false,
        id: i,
      });
    }
    return allNewDice;
  }

  let generatedDice = generateAllNewDice();
  let [allDice, setAllDice] = React.useState(generatedDice);
  let [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    let target = allDice[0].value;
    // check that all dice are on and have same value ...
    /* 
    let hasWon = true;
    for (let dice of allDice) {
      if (dice.value !== target || !dice.on) {
        hasWon = false;
      }
    }
    if (hasWon) {
      setTenzies(true);
      console.log("You WON!");
    }
    */
    // let's use the "JavaScript" approach of doing this instead
    let allDiceOn = allDice.every((die) => die.on);
    let allDiceEqual = allDice.every((die) => die.value === target);
    if (allDiceOn && allDiceEqual) {
      setTenzies(true);
    } else {
      setTenzies(false);
    }
  }, [allDice]);

  let diceElements = allDice.map((die) => (
    <Die
      value={die.value}
      handleClick={toggleDie}
      on={die.on}
      id={die.id}
      key={die.id}
    />
  ));

  function toggleDie(dieId) {
    setAllDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.id === dieId) {
          return { ...die, on: !die.on };
        }
        return die;
      });
    });
  }

  function rollDice() {
    // if user has won, reset all dice, prematurely return
    if (tenzies) {
      setAllDice(generateAllNewDice);
      return;
    }

    setAllDice((prevDice) => {
      let newDice = generateAllNewDice();
      let diceToToggle = [];
      // build array of booleans to determine which stays same
      for (let dice of prevDice) {
        dice.on ? diceToToggle.push(true) : diceToToggle.push(false);
      }
      // change element back to previous die
      for (let i = 0; i < newDice.length; i++) {
        if (diceToToggle[i]) {
          newDice[i] = Object.assign({}, prevDice[i]);
        }
      }
      return newDice;
    });
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div id="dice-wrapper">{diceElements}</div>
      <button type="button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
