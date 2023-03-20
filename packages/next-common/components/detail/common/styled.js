import styled from "styled-components";

export const LinkButton = styled.div`
  display: inline-flex;
  cursor: pointer;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  color: ${(props) => props.theme.textSecondary};
  align-items: center;

  svg {
    margin-left: 8px;
    margin-right: 4px;
  }

  transform: translateY(5px);
`;