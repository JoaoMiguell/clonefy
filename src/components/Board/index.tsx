import { useState } from "react";
import produce from "immer";

import List from "../List"
import { Container } from "./styles"
import { loadLists } from "../../services/api";
import BoardContext from "./context"

const data = loadLists()

function Board() {
  const [lists, setLists] = useState(data)

  function move(fromList:number, toList: number ,from:number, to:number): void {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from]

      draft[fromList].cards.splice(from, 1)
      draft[toList].cards.splice(to, 0, dragged)
    }))
  }
  
  return (
    <BoardContext.Provider value={{lists, move}}>
      <Container>
        {lists.map((list, index) => <List key={index} listIndex={index} title={list.title} cards={list.cards} creatable={list.creatable} done={list.done} />)}
      </Container>
    </BoardContext.Provider>
  )
}

export default Board