import useLike from "../../../../hooks/useLike";

function useEditLike() {
  const { data } = useLike();

  return { data };
}

export default useEditLike;
