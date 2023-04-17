import styled from 'styled-components';

export const Container = styled.div`
  width: 10.5rem;
  text-align: center;
  padding: 1.3rem 0;
  background: ${({ theme, color }) => {
    if (theme.id == 'dark' && color == 'draft')
      return `rgba(223, 227, 250, 0.15)`;
    else if (theme.id == 'light' && color == 'draft')
      return `rgba(55,59,83, 0.15)`;
    else return `rgba(${color}, 0.15)`;
  }};
  border-radius: 6px;
  font-weight: bold;
  text-transform: capitalize;

  span {
    font-size: 12px;
    position: relative;
    margin-right: -1.3rem;
    color: ${({ theme, color }) => {
      if (theme.id == 'dark' && color == 'draft')
        return `rgb(223, 227, 250)`;
      else if (theme.id == 'light' && color == 'draft') return '#373B53';
      else return `rgb(${color})`;
    }};
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      left: -1.6rem;
      top: 1px;
      background: ${({ theme, color }) => {
        if (theme.id == 'dark' && color == 'draft')
          return `rgb(223, 227, 250)`;
        else if (theme.id == 'light' && color == 'draft') return '#373B53';
        else return `rgb(${color})`;
      }};
    }
  }
`;
