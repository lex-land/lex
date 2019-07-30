import styled from 'styled-components';

interface StyledFlexProps {
  align?: 'flex-start' | 'center' | 'flex-end';
  justify?:
    | 'flex-end'
    | 'center'
    | 'flex-start'
    | 'space-between'
    | 'space-around';
  gutter?: number;
  direction?: 'row' | 'column';
}

const StyledFlex = styled.div<StyledFlexProps>`
  display: flex;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  flex-direction: ${props => props.direction};
  flex-wrap: wrap;
  margin: ${props => (props.gutter ? `0 -${props.gutter / 2}px` : '')};
  & > * {
    margin: ${props => (props.gutter ? `0 ${props.gutter / 2}px` : '')};
  }
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
