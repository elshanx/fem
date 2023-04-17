import { Field } from 'formik';
import { Heading } from '../common';
import BillFrom from './BillFrom';
import BillTo from './BillTo';
import { Flex } from './Form.styles';
import FormInvoiceDate from './FormInvoiceDate';
import FormItemListInputs from './FormItemListInputs';
import FormItemListTags from './FormItemListTags';
import FormLabel from './FormLabel';
import FormSelect from './FormSelect';

const FormFields = ({ values, handleBlur }) => {
  return (
    <>
      <BillFrom handleBlur={handleBlur} />
      <BillTo handleBlur={handleBlur} />
      <Flex>
        <FormInvoiceDate handleBlur={handleBlur} />
        <FormSelect />
      </Flex>
      <Field
        handleBlur={handleBlur}
        as={FormLabel}
        large
        name='description'
        type='text'
        text='Project Description'
        placeholder='e.g. Graphic Design Service'
      />
      <>
        <Heading mt='4' color='#777F98'>
          Item List
        </Heading>
        <>
          <FormItemListTags />
          <FormItemListInputs values={values} handleBlur={handleBlur} />
        </>
      </>
    </>
  );
};

export default FormFields;
