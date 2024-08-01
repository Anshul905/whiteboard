import { useRef , useEffect , useContext, useLayoutEffect} from "react"
import rough from 'roughjs';
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES , TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";

function Board() {
  const canvasRef = useRef() ;
  const {  elements , boardMouseDownHandler , boardMouseMoveHandler , toolActionType , boardMouseUpHandler} = useContext(boardContext);

  const { toolboxState } = useContext(toolboxContext)

  useEffect( ()=>{
    const canvas =  canvasRef.current ;
    canvas.width =  window.innerWidth ;
    canvas.height = window.innerHeight ;
    console.log(canvas);
  } , [] )
  
  useLayoutEffect( () => {
    
    const canvas = canvasRef.current
    const canvasContex = canvas.getContext("2d") ;
    canvasContex.save();
    
    let roughCanvas = rough.canvas(canvas);

    elements.forEach( (ele) => {

      switch (ele.type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.RECTANGLE:
        case TOOL_ITEMS.ELLIPSE:
        case TOOL_ITEMS.ARROW:
            roughCanvas.draw(ele.roughEle);
            break;
        case TOOL_ITEMS.BRUSH:
            canvasContex.fillStyle = ele.stroke;
            canvasContex.fill(ele.path);
            canvasContex.restore();
            break;
        default:
            throw new Error("Type not recognized");
      }

    } );

    return () => {
      canvasContex.clearRect(0,0,canvas.width,canvas.height) ;
    };

  }, [ elements ] );
  

  const handleBoardMouseDown = (event) => {
    console.log('Mouse click hua');
    boardMouseDownHandler(event , toolboxState)
  }
  const handleBoardMouseMove = (event) => {
    // if(toolActionType === TOOL_ACTION_TYPES.DRAWING){
    //   console.log('Mouse move ho raha hai');
    //   boardMouseMoveHandler(event)
    // }else{
    //   console.log('You need to click first, then only you can draw something.');
    // }

    // if(toolActionType === TOOL_ACTION_TYPES.DRAWING){
    //   console.log('Mouse move ho raha hai - for drawing');
    //   boardMouseMoveHandler(event)
    // }else if(toolActionType === TOOL_ACTION_TYPES.ERASING){
    //     console.log('Mouse move ho raha hai - for erasing');
    //     boardMouseMoveHandler(event)
    // }else{
    //   console.log('You need to click first, then only you can draw something.');
    // }

    if(toolActionType === TOOL_ACTION_TYPES.NONE){
      console.log('You need to click first, then only you can draw something.');
    }else{
        console.log('Mouse move ho raha hai');
        boardMouseMoveHandler(event)
    }
  }
  const handleBoardMouseUp = (event) => {
    console.log('Mouse chhod diya');
    boardMouseUpHandler(event)
  }

  return(  
    <>
      <canvas ref={canvasRef}
              id="canvas" 
              onMouseDown={ handleBoardMouseDown }
              onMouseMove={ handleBoardMouseMove }
              onMouseUp={handleBoardMouseUp}
            /> 
    </>
  )

}

export default Board ;
