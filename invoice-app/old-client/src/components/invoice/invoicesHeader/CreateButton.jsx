import PlusIcon from '../../svgs/PlusIcon';
import {
  PlusIconContainer,
  StyledCreateButton,
} from './InvoicesHeader.styles';

function CreateButton({ children, ...props }) {
  return (
    <StyledCreateButton {...props}>
      <PlusIconContainer>
        <PlusIcon />
      </PlusIconContainer>
      <span>{children}</span>
    </StyledCreateButton>
  );
}

export default CreateButton;
