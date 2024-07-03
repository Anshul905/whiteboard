import { useRef , useEffect , useContext} from "react"
import rough from 'roughjs';
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";

function Board() {
  const canvasRef = useRef() ;
  const {  elements , boardMouseDownHandler , boardMouseMoveHandler , toolActionType} = useContext(boardContext);

  useEffect( ()=>{
    const canvas =  canvasRef.current ;
    canvas.width =  window.innerWidth ;
    canvas.height = window.innerHeight ;
    console.log(canvas);
  } , [] )
  
  useEffect( () => {
    
    const canvas = canvasRef.current
    const canvasContex = canvas.getContext("2d") ;
    canvasContex.save();
    
    let roughCanvas = rough.canvas(canvas);

    elements.forEach( (ele) => {
      roughCanvas.draw(ele.roughEle);
    } );

    return () => {
      canvasContex.clearRect(0,0,canvas.width,canvas.height) ;
    };

  }, [ elements ] );
  

  const handleBoardMouseDown = (event) => {
    boardMouseDownHandler(event)
  }
  const handleBoardMouseMove = (event) => {
    if(toolActionType === TOOL_ACTION_TYPES.DRAWING){
      boardMouseMoveHandler(event)
    }else{
      console.log('You need to click first, then only you can draw something.');
    }
  }

  return(  
    <>
      <canvas ref={canvasRef} 
              onMouseDown={ handleBoardMouseDown }
              onMouseMove={ handleBoardMouseMove }
            /> 
    </>
  )

}

export default Board ;
