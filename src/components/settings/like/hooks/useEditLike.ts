import { useCallback, useState } from "react";
import { useAlertContext } from "../../../../contexts/AlertContext";
import useLike from "../../../../hooks/useLike";
import { Like } from "../../../../models/like";
import { updateOrder } from "../../../../remote/like";

function useEditLike() {
  const { data = [] } = useLike();
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([]);
  const { open } = useAlertContext();

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

  const save = async () => {
    try {
      await updateOrder(updatedLikes);
      setUpdatedLikes([]);
    } catch {
      open({
        title: "알 수 없는 에러가 발생했습니다.",
        onButtonClick: () => {
          setUpdatedLikes([]);
        },
      });
    }
  };

  return { data: isEdit ? updatedLikes : data, isEdit, reorder, save };
}

export default useEditLike;
