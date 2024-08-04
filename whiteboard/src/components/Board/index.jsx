import { useRef , useEffect , useContext, useLayoutEffect} from "react"
import rough from 'roughjs';
import boardContext from "../../store/board-context";
import { TOOL_ACTION_TYPES , TOOL_ITEMS } from "../../constants";
import toolboxContext from "../../store/toolbox-context";
import classes from "./index.module.css"

function Board() {
  const canvasRef = useRef() ;
  const textAreaRef = useRef()
  const {  elements , boardMouseDownHandler , boardMouseMoveHandler , toolActionType , boardMouseUpHandler , textAreaBlurHandler , undo , redo} = useContext(boardContext);

  const { toolboxState } = useContext(toolboxContext)

  useEffect( ()=>{
    const canvas =  canvasRef.current ;
    canvas.width =  window.innerWidth ;
    canvas.height = window.innerHeight ;
    console.log(canvas);
  } , [] )
  

  useEffect(() => {
    function handleKeyDown(event) {
      if( event.ctrlKey && event.key === "z" ){
        undo();
      }else if( event.ctrlKey && event.key === "y" ){
        redo();
      }
    }
    document.addEventListener("keydown",handleKeyDown);

    return () => {
      document.removeEventListener("keydown",handleKeyDown);
    };

  }, [ undo , redo ]);


  
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
        case TOOL_ITEMS.TEXT:
          console.log("text");
          canvasContex.textBaseline = "top" ; 
          canvasContex.font = `${ele.size}px Caveat` ;
          canvasContex.fillStyle = ele.stroke ;
          canvasContex.fillText(ele.text,ele.x1,ele.y1);
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
  

  useEffect(() => {
    const textArea = textAreaRef.current ;
    if( toolActionType === TOOL_ACTION_TYPES.WRITING ){
      setTimeout(() => {
        textArea.focus() ; 
      }, 0);
    }

  }, [toolActionType])
  



  const handleBoardMouseDown = (event) => {
    console.log('Mouse click hua');
    boardMouseDownHandler(event , toolboxState)
  }
  const handleBoardMouseMove = (event) => {
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
      { 
        toolActionType == TOOL_ACTION_TYPES.WRITING && <textarea
        type="text"
        ref={textAreaRef}
        className={classes.textElementBox}
        style={
          {
            top:elements[elements.length-1].y1,
            left:elements[elements.length-1].x1,
            color: elements[elements.length-1]?.stroke,
            fontSize: `${elements[elements.length-1]?.size}px`,
          }
        }
        onBlur={ (event) => textAreaBlurHandler(event.target.value , toolboxState) }
        />  
      }
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
