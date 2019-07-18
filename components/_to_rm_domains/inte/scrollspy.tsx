import React from 'react';
import Scrollspy from 'react-scrollspy';
import styled from 'styled-components';

const StickyContainer = styled.div`
  position: relative;
  width: 20%;
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  padding: 40px;
  padding-right: 10px;
`;

const ScrollspyListItem = styled.li`
  text-align: right;
  & + & {
    padding-top: 12px;
  }
  a {
    color: #929598;
  }
  &.is-current {
    a {
      color: #106ba3;
    }
  }
`;

const ScrollspyList = styled(Scrollspy)`
  padding-left: 0;
  margin: 0;
  list-style: none;
  font-size: 13px;
`;

export const InteScrollspy = ({ items }: { items: string[] }) => {
  const ids = items;
  return (
    <StickyContainer>
      <Sticky>
        <ScrollspyList items={ids} currentClassName="is-current">
          {ids.map(id => (
            <ScrollspyListItem key={id}>
              <a href={`#${id}`}>{id}</a>
            </ScrollspyListItem>
          ))}
        </ScrollspyList>
      </Sticky>
    </StickyContainer>
  );
};
