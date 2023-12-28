import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
} from "react-beautiful-dnd";
import useEditLike from "../../components/settings/like/hooks/useEditLike";
import ListRow from "../../components/shared/ListRow";
import useLike from "../../hooks/useLike";

function LikePage() {
  const { data } = useEditLike();

  console.log(data);

  return (
    <DragDropContext onDragEnd={() => {}}>
      <StrickModeDroppable droppableId="likes">
        {(droppableProps) => (
          <ul ref={droppableProps.innerRef} {...droppableProps.droppableProps}>
            {data?.map((like, index) => {
              return (
                <Draggable key={like.id} draggableId={like.id} index={index}>
                  {(draggableProps) => (
                    <li
                      ref={draggableProps.innerRef}
                      {...draggableProps.draggableProps}
                      {...draggableProps.dragHandleProps}
                    >
                      <ListRow
                        as="div"
                        contents={
                          <ListRow.Texts
                            title={like.order}
                            subTitle={like.hotelName}
                          />
                        }
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
          </ul>
        )}
      </StrickModeDroppable>
    </DragDropContext>
  );
}

function StrickModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (enabled === false) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
}

export default LikePage;
