import MoonIcon from '../assets/icons/moon-icon.svg';
import NavbarIcon from '../assets/icons/navbar-icon.svg';
import ProfilePhoto from '../assets/images/profile-photo.png';

const Navbar = () => {
  return (
    <nav className='min-h-[72px] relative bg-[#373B53] flex items-center justify-between pr-6'>
      <div>
        <figure className='relative w-[72px] h-[72px] flex items-center justify-center bg-[#7C5DFA] rounded-r-[20px] after:block after:absolute after:top-[50%] z-10 after:left-0 after:bg-[#9277FF]'>
          <img src={NavbarIcon} alt='icon' />
        </figure>
      </div>
      <div className='flex items-center justify-center gap-x-6'>
        <figure>
          <img src={MoonIcon} alt='moon icon' />
        </figure>
        <div className='bg-[#979797] w-[1px] h-full'></div>
        <figure>
          <img src={ProfilePhoto} alt='profile photo' />
        </figure>
      </div>
    </nav>
  );
};

export default Navbar;
