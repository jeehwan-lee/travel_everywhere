import styled from "@emotion/styled";

const Grid = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Grid;
