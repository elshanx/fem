import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const InvoiceContainer = styled(Link)`
  display: block;
  background-color: ${({ theme }) => theme.invoiceBg};
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 0.8rem;
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition);
  border: 1px solid transparent;

  &:hover {
    border: 1px solid var(--color-figure-1);
  }
  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  @media (min-width: 375px) {
    display: grid;
    grid: repeat(5, 1fr);
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    padding: 2.4rem;
  }
  @media (min-width: 768px) {
    padding: 3rem 2.4rem;
    grid-template-rows: 5fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    gap: 1rem;
  }
  @media (min-width: 1440px) {
    padding: 1.6rem 3.2rem;
    width: max-content;
    margin: 0 auto;
    grid-template-columns: 8rem 14.6rem 14.6rem 14.6rem 14.6rem;
  }
`;

export const TagWrapper = styled.div`
  order: 1;

  @media (min-width: 768px) {
    width: 7rem;
  }
`;

export const InvoiceDate = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colorGray};
  text-align: left;

  @media (min-width: 375px) {
    order: 3;
  }
  @media (min-width: 768px) {
    order: 2;
  }
`;

export const InvoicePersonName = styled.p`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: var(--color-gray-2);

  @media (min-width: 375px) {
    order: 2;
    text-align: end;
    margin-right: 3rem;
  }
  @media (min-width: 768px) {
    order: 3;
    text-align: left;
    margin: unset;
  }
`;

export const InvoicePersonAmount = styled.p`
  order: 5;
  font-weight: bold;
  font-size: 1.6rem;
  text-align: right;
  color: ${({ theme }) => theme.text};

  @media (min-width: 375px) {
    text-align: left;
  }
  @media (max-width: 768px) {
    grid-row: 3;
    align-self: end;
  }
  @media (min-width: 768px) {
    order: 4;
    text-align: end;
  }
`;

export const RightSideContainer = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 375px) {
    order: 6;
    margin-left: auto;
    grid-row: 3;
  }
  @media (min-width: 768px) {
    order: 5;
    grid-row: unset;
  }
`;

export const IconButton = styled.button`
  margin-left: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const StatusContainer = styled.div`
  width: 10.4rem;
  text-align: center;
  padding: 1.3rem 1.33rem;
  background: ${({ color }) => `rgba(${color}, 0.15)`};
  border-radius: 8px;
  font-weight: bold;
  text-transform: capitalize;

  span {
    font-size: 12px;
    position: relative;
    margin-right: -1.3rem;
    color: ${({ color }) => `rgb(${color})`};

    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      left: -1.6rem;
      top: 1px;
      background: ${({ color }) => `rgb(${color})`};
    }
  }
`;
