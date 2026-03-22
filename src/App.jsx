import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";
import Entity from "./components/Entity.jsx";

function App() {
  return (
    <div>
      <Header gameName="Monster Slayer" />
      <Game />
    </div>
  );
}

export default App;
