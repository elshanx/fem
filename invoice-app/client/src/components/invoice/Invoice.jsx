import { formatDate } from '../../helpers/formatDates';
import formatNumbers from '../../helpers/formatNumbers';
import Status from '../status/Status';
import RightArrow from '../svgs/RightArrow';
import Tag from '../tag/Tag';
import {
  IconButton,
  InvoiceContainer,
  InvoiceDate,
  InvoicePersonAmount,
  InvoicePersonName,
  RightSideContainer,
  TagWrapper
} from './Invoice.styles';

const Invoice = ({
  id,
  createdAt,
  clientName,
  total,
  status,
  currency = '£'
}) => {
  const formattedTotal = formatNumbers(total.toFixed(2));
  const formattedCreatedAt = formatDate(createdAt);

  return (
    <InvoiceContainer to={`/invoice/${id}`}>
      <TagWrapper>
        <Tag small>{id}</Tag>
      </TagWrapper>
      <InvoiceDate>Due {formattedCreatedAt}</InvoiceDate>
      <InvoicePersonName>{clientName}</InvoicePersonName>
      <InvoicePersonAmount>
        {currency} {formattedTotal}
      </InvoicePersonAmount>
      <RightSideContainer>
        <Status status={status} />
        <IconButton>
          <RightArrow />
        </IconButton>
      </RightSideContainer>
    </InvoiceContainer>
  );
};

export default Invoice;
