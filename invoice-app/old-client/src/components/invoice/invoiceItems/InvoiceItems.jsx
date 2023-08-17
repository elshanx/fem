import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import {
  ItemTags,
  ProjectName,
  Quantity,
  StyledInvoiceItemsPrice,
  StyledInvoiceItemsWrapper,
  StyledItemPrice
} from './InvoiceItems.style';

const InvoiceItems = ({ items }) => {
  const { width } = useWindowDimensions();

  const itemTags = width >= 768 && (
    <ItemTags>
      <span>Item name</span>
      <span>QTY</span>
      <span>Price</span>
      <span>Total</span>
    </ItemTags>
  );

  const content = items ? (
    items.map((item, i) => (
      <StyledInvoiceItemsWrapper key={i}>
        {width < 768 ? (
          <div>
            <ProjectName>{item.name}</ProjectName>
            <Quantity>
              {`${item.quantity} x £`} {item.price}
            </Quantity>
          </div>
        ) : (
          <>
            <ProjectName>{item.name}</ProjectName>
            <Quantity>{item.quantity}</Quantity>
            <StyledItemPrice>{`£ ${item.price}`}</StyledItemPrice>
          </>
        )}
        <StyledInvoiceItemsPrice>£ {item.total}</StyledInvoiceItemsPrice>
      </StyledInvoiceItemsWrapper>
    ))
  ) : (
    <Skeleton height={70} />
  );

  return (
    <>
      {itemTags}
      {content}
    </>
  );
};

export default memo(InvoiceItems);
