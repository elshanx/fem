import { useEffect, useReducer } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import animationReducer from '../../../helpers/animationReducer';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { Heading } from '../../common';
import Form from '../../form/Form';
import Tag from '../../tag/Tag';
import {
  Container,
  HeadingWrapper,
  Wrapper
} from './InvoiceDrawer.styles';

const InvoiceDrawer = () => {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const history = useHistory();
  const [{ state }, dispatch] = useReducer(animationReducer, {});

  useEffect(() => {
    if (width >= '1440' && !width < 1440) dispatch({ type: 'desktop' });
    else if (width >= '768' && !width < 375 && width < 1440)
      dispatch({ type: 'tablet' });
    else {
      dispatch({ type: 'mobile' });
    }
  }, [width]);

  const checkElementName = (e) => {
    if (
      e.target.parentElement?.localName == 'aside' ||
      e.target.localName == 'aside' ||
      e.target.parentElement?.parentElement?.localName == 'aside'
    )
      return;
    return history.goBack();
  };

  const heading = id ? (
    <HeadingWrapper>
      Edit <Tag>{id}</Tag>
    </HeadingWrapper>
  ) : (
    <>New Invoice</>
  );

  return (
    <ScrollLock>
      <Wrapper>
        <OutsideClickHandler
          onOutsideClick={(e) => {
            // TODO: check if input's are dirty before closing drawer
            checkElementName(e);
          }}
        >
          <TouchScrollable>
            <Container
              initial='initial'
              animate='animate'
              exit='exit'
              variants={state}
            >
              <Heading mb='3'>{heading}</Heading>
              <Form id={id} />
            </Container>
          </TouchScrollable>
        </OutsideClickHandler>
      </Wrapper>
    </ScrollLock>
  );
};

export default InvoiceDrawer;
