import List from "../List"
import { Container } from "./styles"
import { loadLists } from "../../services/api";

const lists = loadLists()

function Board() {
  return (
    <Container>
      {lists.map((list, index) => <List key={index} title={list.title} cards={list.cards} creatable={list.creatable} done={list.done} />)}
    </Container>
  )
}

export default Board