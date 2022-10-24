import { Container } from "./styles"
import { MdAdd } from "react-icons/md";
import Card from "../Card";

interface Props {
  title: string
  creatable: boolean
  done?: boolean
  cards: ICard[]
  listIndex: number
}
export interface ICard {
  id: number
  content: string
  labels: string[]
  user?: string
}

function List({title,cards,creatable,done,listIndex}: Props) {
  return (
    <Container done={done}>
      <header>
        <h2>{title}</h2>
        {creatable && (
          <button>
            <MdAdd size={24} color="#FFF"/>
          </button>
        )}
      </header>

      <ul>
        {cards.map((card, index) => (
          <Card 
            key={card.id}
            content={card.content} 
            id={card.id} 
            labels={card.labels} 
            user={card.user} 
            index={index}
            listIndex={listIndex}
          />
        ))}
      </ul>
    </Container>
  )
}

export default List