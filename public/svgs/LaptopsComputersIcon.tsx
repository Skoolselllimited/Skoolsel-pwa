export const LaptopsComputersIcon = ({ highlight }: { highlight: boolean }) => {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 7.5H30V22.5H6V7.5Z"
        stroke={highlight ? 'white' : '#54ABDB'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 28.5H33"
        stroke={highlight ? 'white' : '#54ABDB'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 25.5H24"
        stroke={highlight ? 'white' : '#54ABDB'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
