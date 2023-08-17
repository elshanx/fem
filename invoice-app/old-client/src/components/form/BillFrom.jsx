import { Field } from 'formik';
import { BillToFrom, Flex } from './Form.styles';
import FormLabel from './FormLabel';

const BillFrom = ({ handleBlur }) => {
  return (
    <>
      <BillToFrom>Bill From</BillToFrom>
      <Field
        handleBlur={handleBlur}
        as={FormLabel}
        large
        name='senderAddress.street'
        text='Street Address'
        type='text'
      />
      <Flex mb='3'>
        <Field
          handleBlur={handleBlur}
          as={FormLabel}
          mr
          name='senderAddress.city'
          text='City'
          type='text'
        />
        <Field
          handleBlur={handleBlur}
          as={FormLabel}
          mr
          postCode
          name='senderAddress.postCode'
          text='Post Code'
          type='text'
        />
        <Field
          handleBlur={handleBlur}
          as={FormLabel}
          mr
          name='senderAddress.country'
          text='Country'
          type='text'
        />
      </Flex>
    </>
  );
};

export default BillFrom;
