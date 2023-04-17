import { Link } from 'react-router-dom';
import leftArrow from '../../assets/left-icon.svg';
import { LinkWrapper } from './GoBack.style.js';

const goBack = () => (
  <LinkWrapper>
    <img src={leftArrow} alt='left arrow' />
    <Link to='/invoices/all'>
      <p>Go Back</p>
    </Link>
  </LinkWrapper>
);

export default goBack;
