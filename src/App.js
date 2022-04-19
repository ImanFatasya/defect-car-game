import logo from './logo.svg';
import './App.css';
import styled from "@emotion/styled";
import Game from "../src/components/Game";

function App() {
  return (
    <div className="App">
    <div>
        {/* <Title>Memory Game</Title> */}
        <Game />
      </div>
    </div>
  );
}

export default App;
