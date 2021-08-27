import styled from "styled-components";

import Post from "./post";
import Pagination from "./pagination";
import EmptyList from "./emptyList";

const Wrapper = styled.div`
  > :not(:first-child) {
    margin-top: 16px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
`;


export default function List({ chain, category, items, pagination , create=null }) {
  return (
    <Wrapper>
      <Title>
        {category}
        {create && create}
      </Title>
        {
          items?.length > 0
            ? (
              items.map((item, index) => (
                <Post key={index} data={item} chain={chain}/>
              ))
            ) : (
              <EmptyList/>
            )
        }
      {pagination && <Pagination {...pagination} />}
    </Wrapper>
  );
}
