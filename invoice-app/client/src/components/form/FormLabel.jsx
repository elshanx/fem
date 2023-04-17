import { Text } from '../common';
import { Input } from './Form.styles';

const FormLabel = ({ text, ...props }) => {
  return (
    <>
      <label>
        <Text>{text}</Text>
        <Input {...props} />
      </label>
    </>
  );
};

export default FormLabel;
