import { Field, FieldArray } from 'formik';
import icon from '../../assets/trash-icon.svg';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Button } from '../common';
import {
  Flex,
  Icon,
  IconContainer,
  ItemInputs,
  TotalInput
} from './Form.styles';

const FormItemListInputs = ({ values, handleBlur }) => {
  const calculateTotalPrice = (quantity, price) => {
    if (!quantity) quantity = 1;
    return price * quantity;
  };

  const { width } = useWindowDimensions();
  const inputWidths = {
    name: width < 768 ? 5 : 20,
    quantity: width < 768 ? 10 : 5,
    price: width < 768 ? 8 : 10
  };

  return (
    <FieldArray
      name='items'
      render={(arrayHelpers) => (
        <>
          {values.items?.length > 0 &&
            values.items.map((item, index) => (
              <div key={index}>
                <Flex mb='1.8'>
                  <Field
                    as={ItemInputs}
                    handleBlur={handleBlur}
                    mr='1.5'
                    type='text'
                    name={`items.${index}.name`}
                    width={inputWidths.name}
                    itemName
                  />
                  <Field
                    as={ItemInputs}
                    handleBlur={handleBlur}
                    mr='1.5'
                    type='text'
                    name={`items.${index}.quantity`}
                    width={inputWidths.quantity}
                    min='0'
                  />
                  <Field
                    as={ItemInputs}
                    handleBlur={handleBlur}
                    mr='1.5'
                    type='text'
                    name={`items.${index}.price`}
                    width={inputWidths.price}
                    min='0'
                  />
                  <Field
                    as={TotalInput}
                    name={`items.${index}.total`}
                    handleBlur={handleBlur}
                    disabled
                    value={calculateTotalPrice(item.quantity, item.price)}
                  />
                  <IconContainer
                    tabIndex='0'
                    onClick={() => arrayHelpers.remove(index)}
                    ml='4'
                  >
                    <Icon src={icon} alt='trash icon' />
                  </IconContainer>
                </Flex>
              </div>
            ))}
          <>
            <Button
              onClick={() =>
                arrayHelpers.push({
                  name: '',
                  quantity: '',
                  price: '',
                  total: 0
                })
              }
              type='button'
              sixth
            >
              + Add New Item
            </Button>
          </>
        </>
      )}
    />
  );
};

export default FormItemListInputs;
