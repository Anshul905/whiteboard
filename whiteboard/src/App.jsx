import Board from "./components/Board";
import Toolbar from "./components/Toolbar";
import BoardProvider from "./store/BoardProvider";
import ToolboxProvider from "./store/ToolboxProvider";
import ToolBox from "./components/Toolbox";

function App() {

  return (
    <>
      <BoardProvider>
        <ToolboxProvider>          
          <Toolbar/>
          <ToolBox/>
          <Board/>
        </ToolboxProvider>
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
