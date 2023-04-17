import { useField } from 'formik';
import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { Text } from '../common';

const FormSelect = () => {
  const [field, _, helpers] = useField('paymentTerms');
  const [isOpen, setIsOpen] = useState(false);
  const options = ['Net 1 Day', 'Net 7 Day', 'Net 14 Day', 'Net 30 Day'];
  const [selectedOption, setSelectedOption] = useState(
    options[options.length - 1]
  );

  const toggle = () => setIsOpen((s) => !s);
  const { setValue } = helpers;

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    setValue(value);
  };

  return (
    <label>
      <Text>Payment Terms</Text>
      <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
        <SelectContainer {...field} tabIndex='0'>
          <SelectHeader onClick={toggle}>{selectedOption}</SelectHeader>
          {isOpen && (
            <SelectListContainer>
              {options.map((option) => (
                <ListItem onClick={onOptionClicked(option)} key={uuid()}>
                  {option}
                </ListItem>
              ))}
            </SelectListContainer>
          )}
        </SelectContainer>
      </OutsideClickHandler>
    </label>
  );
};

const SelectContainer = styled.div`
  background: ${({ theme }) => theme.formInputBg};
  color: ${({ theme }) => theme.invoiceSelect.fg};
  height: 5rem;
  border-radius: 4px;
  outline: var(--color-figure-1);
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  transition: var(--transition);
  position: relative;
  border: 1px solid ${({ theme }) => theme.invoiceSelect.border};

  &:is(:active, :focus) {
    border: 1px solid var(--color-figure-1);
  }
  @media (min-width: 375px) {
    width: 30rem;
  }
  @media (min-width: 520px) {
    width: 50rem;
  }
  @media (min-width: 768px) {
    width: 24rem;
  }
`;

const SelectHeader = styled.div`
  height: 100%;
  width: 100%;
  text-align: left;
  padding: 1.7rem 0;
  padding-left: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.formInputBg};
  border-radius: 4px;
  transition: var(--transition);
`;

const SelectListContainer = styled.div`
  text-align: center;
  overflow: hidden;
  border-radius: 8px;
  transition: var(--transition);
  background: ${({ theme }) => theme.invoiceSelect.bg};
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25);
`;

const ListItem = styled.div`
  padding: 1.5rem 2.4rem;
  color: ${({ theme }) => theme.invoiceSelect.fg};
  background: ${({ theme }) => theme.invoiceSelect.bg};
  text-align: left;
  transition: var(--transition);
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.invoiceSelect.hover};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.invoiceSelect.border};
  }
`;

export default FormSelect;
