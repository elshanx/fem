import { Button as TemplateButton } from '../../components/common';
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
`;

export const Side = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  ${({ left }) =>
    left &&
    `
    background: var(--color-figure-1);

    @media (max-width: 693px) {
      width: 20%;
    }
  `};

  ${({ right }) =>
    right &&
    `
    background: #F8F8FB;
    @media (max-width: 1024px) {
      width: 100%;
    }
  `};
`;

export const Heading = styled.h1`
  width: 50%;
  font-size: 7.2rem;
  color: #fff;

  @media (max-width: 1024px) {
    font-size: 3rem;
  }

  @media (max-width: 693px) {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    font-size: 2.5rem;
  }
`;

export const Label = styled.label`
  color: var(--color-figure-3);
  font-size: 1.1rem;
  margin-left: 0.5rem;
`;

export const Input = styled.input`
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #dfe3fa;
  margin-bottom: 2rem;
  width: 20rem;
  font-family: inherit;
  font-weight: 500;
`;

export const Button = styled(TemplateButton)`
  width: 20rem;
`;
