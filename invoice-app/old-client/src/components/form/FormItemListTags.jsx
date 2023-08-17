import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Text } from '../common';
import { Flex } from './Form.styles';

const FormItemListTags = () => {
  const { width } = useWindowDimensions();
  const inputWidths = {
    name: width < 768 ? 5 : 20,
    quantity: width < 768 ? 10 : 5,
    price: width < 768 ? 8 : 10
  };
  return (
    <Flex>
      <Text itemName tags mr width={inputWidths.name}>
        Item Name
      </Text>
      <Text tags mr width={inputWidths.quantity}>
        Qty
      </Text>
      <Text tags mr width={inputWidths.price}>
        Price
      </Text>
      <Text tags mr>
        Total
      </Text>
    </Flex>
  );
};

export default FormItemListTags;
