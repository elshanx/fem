import { Tag as HashTag, Wrapper } from './Tag.style';

const Tag = ({ small, children }) => (
  <Wrapper small={small}>
    <HashTag>#</HashTag>
    {children}
  </Wrapper>
);

export default Tag;
