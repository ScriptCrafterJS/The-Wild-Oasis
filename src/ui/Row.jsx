import styled, { css } from "styled-components";

const RowComponent = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

const Row = ({ type = "vertical", ...props }) => (
  <RowComponent type={type} {...props} />
);

export default Row;
