import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useAlertContext } from "../../../../contexts/AlertContext";
import useLike from "../../../../hooks/useLike";
import { Like } from "../../../../models/like";
import { updateOrder } from "../../../../api/like";

function useEditLike() {
  const { data } = useLike();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedLikes, setUpdatedLikes] = useState<Like[]>([]);
  const { open } = useAlertContext();
  const client = useQueryClient();

  useEffect(() => {
    if (data != null) {
      setUpdatedLikes(data);
    }
  }, [data]);

  const reorder = useCallback((from: number, to: number) => {
    setIsEdit(true);

    setUpdatedLikes((prevUpdatedLikes) => {
      const newItems = [...prevUpdatedLikes];

      const [fromItem] = newItems?.splice(from, 1);

      if (fromItem != null) {
        newItems?.splice(to, 0, fromItem);
      }

      newItems.forEach((like, index) => {
        like.order = index + 1;
      });

      return newItems;
    });
  }, []);

  const save = async () => {
    try {
      await updateOrder(updatedLikes);
      client.setQueryData(["likes"], updatedLikes);
      setIsEdit(false);
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
