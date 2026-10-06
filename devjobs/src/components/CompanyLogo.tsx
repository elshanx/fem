interface Props {
  logo: string;
  background: string;
  className?: string;
  logoClassName?: string;
}

export default function CompanyLogo({
  logo,
  background,
  className = '',
  logoClassName = '',
}: Props) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden ${className}`}
      style={{ backgroundColor: background }}
    >
      {/* Small SVGs in a fixed-size tile: next/image adds nothing here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo} alt='' className={logoClassName} />
    </span>
  );
}
