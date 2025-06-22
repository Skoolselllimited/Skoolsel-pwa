export const FashionIcon = ({ highlight }: { highlight: boolean }) => {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 4.5C15 4.5 12.75 6.75 12.75 9.75V10.5H9C7.34315 10.5 6 11.8431 6 13.5V28.5C6 30.1569 7.34315 31.5 9 31.5H27C28.6569 31.5 30 30.1569 30 28.5V13.5C30 11.8431 28.6569 10.5 27 10.5H23.25V9.75C23.25 6.75 21 4.5 18 4.5Z"
        stroke={highlight ? 'white' : '#54ABDB'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
