import { useRef , useEffect , useContext} from "react"
import rough from 'roughjs';
import boardContext from "../../store/board-context";


function Board() {
  const canvasRef = useRef() ;
  const {  elements , boardMouseDownHandler } = useContext(boardContext);

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

  return(  
    <>
      <canvas ref={canvasRef} onMouseDown={ handleBoardMouseDown }/> 
    </>
  )

}

export default Board ;
