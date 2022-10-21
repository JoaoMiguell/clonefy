import { useDrag } from "react-dnd";

import { ICard } from "../List";
import { Container, Label } from "./styles";

function Card({id,content,labels,user}: ICard) {
  const [{isDragging}, dragRef] = useDrag({
    type: "CARD",
    item: "CARD",
    collect: monitor => ({
      isDragging: monitor.isDragging
    })
  })
  
  return (
    <Container ref={dragRef} isDragging={isDragging}>
      <header>
        {labels.map((label, index) => <Label key={index} color={label}/>)}
        
      </header>
      <p>{content}</p>
      {user && <img src={user}/> }
  
    </Container>
  )
}

export default Card;