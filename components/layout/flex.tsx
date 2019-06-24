import styled from 'styled-components';

interface StyledFlexProps {
  align?: 'flex-start' | 'center' | 'flex-end';
  justify?:
    | 'flex-end'
    | 'center'
    | 'flex-start'
    | 'space-between'
    | 'space-around';
}

const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  flex-wrap: wrap;
`;

const Justified = styled(StyledFlex)`
  justify-content: space-between;
`;

export const Flex = Object.assign(StyledFlex, {
  Auto: styled.div`
    flex: 1 1;
  `,
  Center: styled(StyledFlex)`
    justify-content: center;
  `,
  Justified,
});
