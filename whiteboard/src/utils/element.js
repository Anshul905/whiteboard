import { TOOL_ITEMS , BOARD_ACTIONS , TOOL_ACTION_TYPES, ARROW_LENGTH} from "../constants";
import { getArrowHeadsCoordinates } from "./math";

import rough from "roughjs/bin/rough"
const gen = rough.generator();



export const createRoughElement = ( id , x1 , y1 , x2 , y2 , { type } ) => {
    const element = {
        id,
        x1,
        y1,
        x2,
        y2,
    };
    // console.log(type);
    const options = { 
        seed : id + 1 //seed can't be 0 , id can be 0
        
        
    } 
    switch (type) {
        case TOOL_ITEMS.LINE:
            element.roughEle =  gen.line(x1,y1,x2,y2,options);
            return element 
            case TOOL_ITEMS.RECTANGLE:
                element.roughEle =  gen.rectangle(x1,y1,x2-x1,y2-y1,options);
                return element 
            case TOOL_ITEMS.ELLIPSE:
                element.roughEle =  gen.ellipse((x1+x2)/2,(y1+y2)/2,x2-x1,y2-y1,options);
                return element 
            case TOOL_ITEMS.ARROW:
                const { x3 , y3 , x4 , y4 } = getArrowHeadsCoordinates(x1,y1,x2,y2,ARROW_LENGTH);
                const pointsPath = [ [x1,y1] , [x2,y2] , [x3,y3] , [x2,y2] , [x4,y4] ] 
                element.roughEle =  gen.linearPath( pointsPath , options);
                return element 
            default:
            throw new Error("Type not recognized") 
    }    
}