import { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { v4 as uuid } from 'uuid';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Checkbox from '../checkbox/Checkbox';
import BottomArrow from '../svgs/BottomArrow';
import { DropdownContainer, ListItem, Wrapper } from './Filter.style';

const Filter = () => {
  const [open, setOpen] = useState(false);
  const options = ['draft', 'pending', 'paid'];
  const { width } = useWindowDimensions();
  const text = width < 768 ? <p>Filter</p> : <p>Filter by Status</p>;

  return (
    <Wrapper>
      <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
        <Wrapper onClick={() => setOpen((s) => !s)}>
          {text}
          <BottomArrow open={open} />
          {open && (
            <DropdownContainer onClick={(e) => e.stopPropagation()}>
              {options.map((option) => (
                <label key={uuid()}>
                  <ListItem>
                    <Checkbox option={option} />
                    <span style={{ marginLeft: '1rem' }}>{option}</span>
                  </ListItem>
                </label>
              ))}
            </DropdownContainer>
          )}
        </Wrapper>
      </OutsideClickHandler>
    </Wrapper>
  );
};

export default Filter;
