interface InfoItemProps {
  label: string;
  value: string;
}

export default function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <dt className='inline font-semibold'>{label}: </dt>
      <dd className='inline font-light'>{value}</dd>
    </div>
  );
}
