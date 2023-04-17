import { useHistory } from 'react-router-dom';
import { Button } from '../common';
import { ButtonContainer } from './Form.styles';

const FormButtonContainer = ({ id }) => {
  const { goBack } = useHistory();

  if (id)
    return (
      <ButtonContainer>
        <Button onClick={() => goBack()} type='button' third mr='1'>
          Cancel
        </Button>
        <Button type='submit' second>
          Save Changes
        </Button>
      </ButtonContainer>
    );

  if (!id)
    return (
      <ButtonContainer>
        <Button
          onClick={() => goBack()}
          style={{ marginRight: 'auto' }}
          third
          type='button'
        >
          Discard
        </Button>
        <Button type='button' fourth mr='1'>
          Save as Draft
        </Button>
        <Button type='submit' second>
          Save & Send
        </Button>
      </ButtonContainer>
    );
};

export default FormButtonContainer;
