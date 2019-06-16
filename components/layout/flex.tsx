import styled from 'styled-components';

const StyledFlex = styled.div`
  display: flex;
`;

const Justified = Object.assign(
  styled(StyledFlex)`
    justify-content: space-between;
  `,
  {
    // Left: styled.div``,
    // Right: styled.div``,
  },
);

export const Flex = Object.assign(StyledFlex, {
  Auto: styled.div`
    flex: 1 1;
  `,
  Center: styled(StyledFlex)`
    justify-content: center;
  `,
  Justified,
});
