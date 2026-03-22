import React, {useState} from "react";
import Entity from "./Entity";
import GameOver from "./GameOver";
import Log from "./Log";

// ----------------------------------------------------------------------------------------------------------
// HELPER FUNCTIONS
// ----------------------------------------------------------------------------------------------------------

// Generate a random values in the range {min, max}
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Create an attack log
function createLogAttack(isPlayer, damage) {
  return {
    isPlayer: isPlayer,
    isDamage: true,
    text: ` takes ${damage} damages`,
  };
}

// Create a healing log
function createLogHeal(healing) {
  return {
    isPlayer: true,
    isDamage: false,
    text: ` heal ${healing} life points`,
  };
}

function Game() {
  // ----------------------------------------------------------------------------------------------------------
  // STATES & VARIABLES
  // ----------------------------------------------------------------------------------------------------------
  const [playerHealth, setPlayerHealth] = useState(100);
  const [monsterHealth, setMonsterHealth] = useState(100);
  const [logs, setLogs] = useState([]);
  const [turn, setTurn] = useState(0);
  const canUseSpecial = turn % 3 === 0;
  // ----------------------------------------------------------------------------------------------------------
  // BUTTONS EVENT FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
function handleAttack() {
    const playerDamage = getRandomValue(5, 12);
    const monsterDamage = getRandomValue(8, 15);

    setMonsterHealth((prev) => Math.max(prev - playerDamage, 0));
    setPlayerHealth((prev) => Math.max(prev - monsterDamage, 0));
  
  setTurn((prev) => prev + 1);
  
    setLogs((prevLogs) => [
      createLogAttack(true, playerDamage),
      createLogAttack(false, monsterDamage),
      ...prevLogs,
    ])
  }
  function handleHeal() {
    const healValue = getRandomValue(8, 20);
    const monsterDamage = getRandomValue(8, 15);

    setPlayerHealth((prev) => Math.min(prev + healValue, 100));
    setMonsterHealth((prev) => Math.min(prev - monsterDamage, 50));

    setTurn((prev) => prev + 1);

    setLogs((prevLogs) => [
      createLogHeal(healValue),
      createLogAttack(false, monsterDamage),
      ...prevLogs,
    ]);
  }
  function handleSpecialAttack() {
  const playerDamage = getRandomValue(10, 25);
  const monsterDamage = getRandomValue(8, 15);

  setMonsterHealth((prev) => Math.max(prev - playerDamage, 0));
  setPlayerHealth((prev) => Math.max(prev - monsterDamage, 0));

  setTurn((prev) => prev + 1);

  setLogs((prevLogs) => [
    createLogAttack(true, playerDamage),
    createLogAttack(false, monsterDamage),
    ...prevLogs,
  ]);
  }
  function handleKill() {
  setPlayerHealth(0);
}
  // ----------------------------------------------------------------------------------------------------------
  // JSX FUNCTIONS
  // ----------------------------------------------------------------------------------------------------------
  

  const isGameOver = playerHealth <= 0 || monsterHealth <= 0;
   function getGameResult() {
  if (playerHealth <= 0 && monsterHealth <= 0) {
    return "Draw Game!";
  } else if (playerHealth <= 0) {
    return "You Lost!";
  } else if (monsterHealth <= 0) {
    return "You Won!";
     }
     return "";
}

function restartGame() {
  setPlayerHealth(100);
  setMonsterHealth(100);
  setLogs([]);
  setTurn(0);
}
  // ----------------------------------------------------------------------------------------------------------
  // MAIN  TEMPLATE
  // ------------------
  // ----------------------------------------------------------------------------------------
  return (<>
    <Entity NameTitle={"Monster Health"} percentage={monsterHealth} />
      <Entity NameTitle={"Your Health"} percentage={playerHealth} />
    <section id="controls">
  {!isGameOver && (
    <>
      <button onClick={handleAttack}>Attack</button>
      <button onClick={handleSpecialAttack} disabled={!canUseSpecial}>Special Attack</button>
      <button onClick={handleHeal}>Heal</button>
      <button onClick={handleKill}>Kill</button>
    </>
  )}
</section>
    {isGameOver && (
      <GameOver title={getGameResult()} restartGame={restartGame} />
    )}
    <Log listlog={logs} />
  </>
  );
}

export default Game;
