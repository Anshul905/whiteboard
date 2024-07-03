import { useRef , useEffect , useContext} from "react"
import rough from 'roughjs';
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES } from "../../constants";

function Board() {
  const canvasRef = useRef() ;
  const {  elements , boardMouseDownHandler , boardMouseMoveHandler , toolActionType , boardMouseUpHandler} = useContext(boardContext);

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
    console.log('Mouse click hua');
    boardMouseDownHandler(event)
  }
  const handleBoardMouseMove = (event) => {
    if(toolActionType === TOOL_ACTION_TYPES.DRAWING){
      console.log('Mouse move ho raha hai');
      boardMouseMoveHandler(event)
    }else{
      console.log('You need to click first, then only you can draw something.');
    }
  }
  const handleBoardMouseUp = (event) => {
    console.log('Mouse chhod diya');
    boardMouseUpHandler(event)
  }

  return(  
    <>
      <canvas ref={canvasRef} 
              onMouseDown={ handleBoardMouseDown }
              onMouseMove={ handleBoardMouseMove }
              onMouseUp={handleBoardMouseUp}
            /> 
    </>
  )

}

export default Board ;
