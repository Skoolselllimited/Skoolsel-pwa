export const BeautyIcon = ({ highlight }: { highlight: boolean }) => {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 4.5L12 16.5V28.5H24V16.5L18 4.5Z"
        stroke={highlight ? 'white' : '#54ABDB'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 28.5H21"
        stroke={highlight ? 'white' : '#54ABDB'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
