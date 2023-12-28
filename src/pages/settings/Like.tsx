import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from "react-beautiful-dnd";
import useEditLike from "../../components/settings/like/hooks/useEditLike";
import FixedBottomButton from "../../components/shared/FixedBottomButton";
import ListRow from "../../components/shared/ListRow";
import useLike from "../../hooks/useLike";

function LikePage() {
  const { data, isEdit, reorder } = useEditLike();

  const handleDragEndDrop = (result: DropResult) => {
    if (result.destination == null) {
      return;
    }

    const from = result.source.index;
    const to = result.destination?.index;

    reorder(from, to);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrickModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
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
      {isEdit ? (
        <FixedBottomButton
          label="저장하기"
          onClick={() => console.log("hello")}
        />
      ) : null}
    </>
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
