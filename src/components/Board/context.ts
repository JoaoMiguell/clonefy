import { createContext } from "react";

export default createContext({
  lists: [] as any[],
  move: (fromList: number,toList:number, from:number, to:number):void => {}
})