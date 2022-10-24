import { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";

import { ICard } from "../List";
import { Container, Label } from "./styles";
import BoardContext from "../Board/context"

interface ICardProps extends ICard { 
  index: number
  listIndex: number
}
interface TargetSize {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}

function Card({id,content,labels,user,index, listIndex}: ICardProps) {
  const ref = useRef<any>()
  const { move } = useContext(BoardContext)

  const [{isDragging}, dragRef] = useDrag({
    type: "CARD",
    item: {index, listIndex},
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [, dropRef] = useDrop({
    accept: "CARD",
    hover(item:any, monitor) {
      const draggedIndex = item.index
      const targetIndex = index
      const draggedListIndex = item.listIndex
      const targetListIndex = listIndex

      if(draggedIndex == targetIndex && draggedListIndex == targetListIndex) return;

      const targetSize: TargetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2
      
      const draggedOffset = monitor.getClientOffset()!
      const draggedTop = draggedOffset.y - targetSize.top

      if (draggedIndex < targetIndex && draggedTop < targetCenter) return; 
      if (draggedIndex > targetIndex && draggedTop > targetCenter) return;  
      
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex)

      item.index = targetIndex
      item.listIndex = targetListIndex
    }
  })

  dragRef(dropRef(ref))
  
  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {labels.map((label, index) => <Label key={index} color={label}/>)}
        
      </header>
      <p>{content}</p>
      {user && <img src={user}/> }
  
    </Container>
  )
}

export default Card;