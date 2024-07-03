import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import BoardProvider from "./store/BoardProvider";

function App() {

  return (
    <>
      <BoardProvider>
        <Toolbar/>
        <Board/>
      </BoardProvider>

      {/* <div className="app">
        <Toolbar />
        <Board /> 
        <h1>Whiteboard App</h1>
      </div> */}

    </>
  )
}

export default App
