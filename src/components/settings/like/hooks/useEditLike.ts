import { useCallback, useState } from "react";
import useLike from "../../../../hooks/useLike";
import { Like } from "../../../../models/like";

function useEditLike() {
  const { data = [] } = useLike();
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([]);

  const isEdit = updatedLikes.length > 0;

  const reorder = useCallback(
    (from: number, to: number) => {
      const newItems = [...data];

      const [fromItem] = newItems?.splice(from, 1);

      if (fromItem != null) {
        newItems?.splice(to, 0, fromItem);
      }

      setUpdatedLikes(newItems);
    },
    [data]
  );

  const save = () => {};

  return { data: isEdit ? updatedLikes : data, isEdit, reorder };
}

export default useEditLike;
