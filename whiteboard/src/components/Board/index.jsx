import { useRef , useEffect } from "react"
import rough from 'roughjs';

function Board() {
  const canvasRef = useRef() ;

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let roughCanvas = rough.canvas(canvas);
    let generator = roughCanvas.generator;
    let rect1 = generator.rectangle(10, 10, 100, 100 , {fill: 'blue' } );
    let rect2 = generator.rectangle(10, 120, 100, 100, {fill: 'red' ,  stroke: 'green', strokeWidth: 3 ,roughness: 2 , });
    let rect3 = generator.rectangle(10, 240, 100, 100, { bowing: 2, stroke: 'green', strokeWidth: 3 });
    roughCanvas.draw(rect1);
    roughCanvas.draw(rect2);
    roughCanvas.draw(rect3);


  }, [] );
  

  return(  
    <>
      <canvas ref={canvasRef} /> 
    </>
  )

}

export default Board ;
