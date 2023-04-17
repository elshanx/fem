import { Field } from 'formik';
import { BillToFrom, Flex } from './Form.styles';
import FormLabel from './FormLabel';

const BillTo = ({ handleBlur }) => {
  return (
    <>
      <BillToFrom>Bill To</BillToFrom>
      <Field
        handleBlur={handleBlur}
        as={FormLabel}
        large
        name='clientName'
        text='Client’s Name'
        type='text'
      />
      <Field
        handleBlur={handleBlur}
        as={FormLabel}
        large
        name='clientEmail'
        text='Client&#39;s email'
        placeholder='e.g. email@example.com'
        type='text'
      />
      <Field
        handleBlur={handleBlur}
        as={FormLabel}
        large
        name='clientAddress.street'
        text='Street Address'
        type='text'
      />
      <Flex mb='3'>
        <Field
          handleBlur={handleBlur}
          as={FormLabel}
          mr
          name='clientAddress.city'
          type='text'
          text='City'
        />
        <Field
          handleBlur={handleBlur}
          as={FormLabel}
          mr
          name='clientAddress.postCode'
          type='text'
          postCode
          text='Post Code'
        />
        <Field
          handleBlur={handleBlur}
          as={FormLabel}
          name='clientAddress.country'
          type='text'
          text='Country'
        />
      </Flex>
    </>
  );
};

export default BillTo;
