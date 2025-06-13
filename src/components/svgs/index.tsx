interface IconProps {
  className?: string
}
export function MenuIcon({ className }: IconProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.375 7.4375H23.625"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.625 11.8125H23.625"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.37549 16.1875H23.6248"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.62549 20.5625H23.6248"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CircledPlusIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="white"
        strokeWidth="1.6"
        strokeMiterlimit="10"
      />
      <path
        d="M8.25 12H15.75"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.25V15.75"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowLeftIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.25 12H3.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.25L3.75 12L10.5 18.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function ArrowRightIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.75 12H20.25"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 5.25L20.25 12L13.5 18.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function LightStrikeIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.69793 1.82422L2.03125 9.82421H8.03125L7.36457 15.1576L14.0313 7.15757H8.03125L8.69793 1.82422Z"
        stroke="#FFCC33"
        strokeWidth="0.872728"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MapPinIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.5 14.5H12.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 6.5C13 11 8 14.5 8 14.5C8 14.5 3 11 3 6.5C3 5.17392 3.52678 3.90215 4.46447 2.96447C5.40215 2.02678 6.67392 1.5 8 1.5C9.32608 1.5 10.5979 2.02678 11.5355 2.96447C12.4732 3.90215 13 5.17392 13 6.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_6446_5072)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.99992 1.82715C6.36442 1.82715 4.7959 2.47685 3.63943 3.63332C2.48295 4.7898 1.83325 6.35831 1.83325 7.99381C1.83325 9.62932 2.48295 11.1978 3.63943 12.3543C4.7959 13.5108 6.36442 14.1605 7.99992 14.1605C9.63542 14.1605 11.2039 13.5108 12.3604 12.3543C13.5169 11.1978 14.1666 9.62932 14.1666 7.99381C14.1666 6.35831 13.5169 4.7898 12.3604 3.63332C11.2039 2.47685 9.63542 1.82715 7.99992 1.82715ZM0.833252 7.99381C0.833252 4.03582 4.04192 0.827148 7.99992 0.827148C11.9579 0.827148 15.1666 4.03582 15.1666 7.99381C15.1666 11.9518 11.9579 15.1605 7.99992 15.1605C4.04192 15.1605 0.833252 11.9518 0.833252 7.99381ZM7.99992 4.82715C8.13253 4.82715 8.2597 4.87983 8.35347 4.97359C8.44724 5.06736 8.49992 5.19454 8.49992 5.32715V7.78715L10.0199 9.30715C10.069 9.35292 10.1084 9.40812 10.1358 9.46946C10.1631 9.53079 10.1778 9.597 10.179 9.66413C10.1802 9.73127 10.1678 9.79795 10.1427 9.86021C10.1175 9.92247 10.0801 9.97903 10.0326 10.0265C9.98513 10.074 9.92858 10.1114 9.86632 10.1366C9.80406 10.1617 9.73737 10.1741 9.67024 10.1729C9.6031 10.1717 9.53689 10.157 9.47556 10.1297C9.41423 10.1023 9.35903 10.0629 9.31325 10.0138L7.64659 8.34715C7.55279 8.25347 7.50004 8.12638 7.49992 7.99381V5.32715C7.49992 5.19454 7.5526 5.06736 7.64637 4.97359C7.74013 4.87983 7.86731 4.82715 7.99992 4.82715Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      </g>
      <defs>
        <clipPath id="clip0_6446_5072">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
export function EnvelopeIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 5.25L12 13.5L3 5.25"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 5.25H21V18C21 18.1989 20.921 18.3897 20.7803 18.5303C20.6397 18.671 20.4489 18.75 20.25 18.75H3.75C3.55109 18.75 3.36032 18.671 3.21967 18.5303C3.07902 18.3897 3 18.1989 3 18V5.25Z"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3636 12L3.2312 18.538"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.7687 18.5381L13.6362 12"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function EyeIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 4.25C4.5 4.25 1.5 12.0008 1.5 12.0008C1.5 12.0008 4.5 19.75 12 19.75C19.5 19.75 22.5 12.0008 22.5 12.0008C22.5 12.0008 19.5 4.25 12 4.25Z"
        stroke="#637381"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z"
        stroke="#637381"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function ExpandIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.75 1.5H16.5V5.25"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.25 16.5H1.5V12.75"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 12.75V16.5H12.75"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.5 5.25V1.5H5.25"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function VerifiedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" rx="8" fill="#27C200" />
      <path
        d="M11.4375 5.8125L7.0625 10.1873L4.875 8"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function HeartIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 20.25C12 20.25 2.625 15 2.625 8.62501C2.62519 7.49826 3.01561 6.40635 3.72989 5.53493C4.44416 4.66351 5.4382 4.06636 6.54299 3.84501C7.64778 3.62367 8.79514 3.79179 9.78999 4.32079C10.7848 4.84979 11.5658 5.70702 12 6.74673L12 6.74673C12.4342 5.70702 13.2152 4.84979 14.21 4.32079C15.2049 3.79179 16.3522 3.62367 17.457 3.84501C18.5618 4.06636 19.5558 4.66351 20.2701 5.53493C20.9844 6.40635 21.3748 7.49826 21.375 8.62501C21.375 15 12 20.25 12 20.25Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M19.9272 5C21.6225 5.45592 23.1682 6.34928 24.4095 7.59059C25.6508 8.8319 26.5441 10.3776 27.0001 12.0728"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.8916 8.86328C19.9087 9.13683 20.8362 9.67285 21.5809 10.4176C22.3257 11.1624 22.8617 12.0898 23.1353 13.107"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5595 15.6006C12.5968 17.7212 14.3158 19.4324 16.4412 20.4601C16.5967 20.5337 16.7687 20.5657 16.9403 20.5527C17.1119 20.5397 17.2771 20.4823 17.4198 20.386L20.5492 18.2992C20.6877 18.2069 20.8469 18.1506 21.0126 18.1354C21.1782 18.1202 21.3451 18.1465 21.498 18.2121L27.3526 20.7212C27.5515 20.8057 27.7175 20.9525 27.8257 21.1396C27.9339 21.3266 27.9783 21.5438 27.9524 21.7583C27.7673 23.2063 27.0608 24.5372 25.9652 25.5018C24.8695 26.4664 23.4598 26.9986 22 26.9987C17.4913 26.9987 13.1673 25.2076 9.97919 22.0195C6.79107 18.8314 5 14.5073 5 9.99866C5.00008 8.53888 5.53224 7.12917 6.49685 6.0335C7.46146 4.93783 8.79237 4.23133 10.2404 4.04628C10.4549 4.02032 10.672 4.06478 10.8591 4.17296C11.0461 4.28114 11.193 4.44718 11.2775 4.64606L13.7888 10.5058C13.8537 10.6574 13.8802 10.8226 13.8658 10.9869C13.8514 11.1512 13.7967 11.3094 13.7064 11.4473L11.6268 14.6248C11.5322 14.7677 11.4762 14.9328 11.4644 15.1038C11.4526 15.2748 11.4854 15.446 11.5595 15.6006V15.6006Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function AngleDown({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.0004 13.4164C9.8057 13.4168 9.61701 13.349 9.46708 13.2248L4.46708 9.05809C4.1127 8.76354 4.06419 8.23748 4.35874 7.88309C4.6533 7.52871 5.17936 7.48021 5.53374 7.77476L10.0004 11.5081L14.4671 7.90809C14.6392 7.76829 14.86 7.70287 15.0806 7.72633C15.3011 7.74979 15.5032 7.86019 15.6421 8.03309C15.7964 8.20631 15.8715 8.43599 15.8493 8.66689C15.8272 8.89779 15.7098 9.10902 15.5254 9.24976L10.5254 13.2748C10.3712 13.3794 10.1863 13.4292 10.0004 13.4164Z"
        fill="#637381"
      />
    </svg>
  )
}
export function ErrorIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.843 3.802C9.872 2.601 10.886 2 12 2C13.114 2 14.128 2.6 16.157 3.802L16.843 4.208C18.872 5.41 19.886 6.011 20.443 7C21 7.99 21 9.19 21 11.594V12.406C21 14.809 21 16.011 20.443 17C19.886 17.99 18.872 18.59 16.843 19.791L16.157 20.198C14.128 21.399 13.114 22 12 22C10.886 22 9.872 21.4 7.843 20.198L7.157 19.791C5.128 18.591 4.114 17.989 3.557 17C3 16.01 3 14.81 3 12.406V11.594C3 9.19 3 7.989 3.557 7C4.114 6.01 5.128 5.41 7.157 4.208L7.843 3.802ZM13 16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15C12.2652 15 12.5196 15.1054 12.7071 15.2929C12.8946 15.4804 13 15.7348 13 16ZM12 6.25C12.1989 6.25 12.3897 6.32902 12.5303 6.46967C12.671 6.61032 12.75 6.80109 12.75 7V13C12.75 13.1989 12.671 13.3897 12.5303 13.5303C12.3897 13.671 12.1989 13.75 12 13.75C11.8011 13.75 11.6103 13.671 11.4697 13.5303C11.329 13.3897 11.25 13.1989 11.25 13V7C11.25 6.80109 11.329 6.61032 11.4697 6.46967C11.6103 6.32902 11.8011 6.25 12 6.25Z"
        fill="#FF4F4F"
      />
    </svg>
  )
}
export function AnchorLink({ className }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.55793 5.58209L11.1047 4.0353C11.4239 3.71585 11.8028 3.46242 12.22 3.28947C12.6371 3.11652 13.0842 3.02745 13.5357 3.02734C13.9873 3.02724 14.4344 3.1161 14.8516 3.28885C15.2688 3.46161 15.6479 3.71487 15.9672 4.03416C16.2865 4.35346 16.5398 4.73254 16.7125 5.14974C16.8853 5.56694 16.9741 6.01409 16.974 6.46564C16.9739 6.9172 16.8849 7.36431 16.7119 7.78143C16.539 8.19855 16.2855 8.57751 15.9661 8.89665L13.7564 11.1064C13.4372 11.4256 13.0582 11.6788 12.6412 11.8515C12.2241 12.0243 11.7771 12.1132 11.3257 12.1132C10.8743 12.1132 10.4273 12.0243 10.0102 11.8515C9.59317 11.6788 9.21422 11.4256 8.89502 11.1064"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.442 14.4178L8.89519 15.9646C8.57604 16.2841 8.19708 16.5375 7.77996 16.7104C7.36284 16.8834 6.91573 16.9725 6.46418 16.9726C6.01263 16.9727 5.56548 16.8838 5.14827 16.711C4.73107 16.5383 4.352 16.285 4.0327 15.9657C3.7134 15.6464 3.46014 15.2674 3.28739 14.8502C3.11464 14.433 3.02577 13.9858 3.02588 13.5343C3.02598 13.0827 3.11505 12.6356 3.288 12.2185C3.46095 11.8014 3.71439 11.4224 4.03383 11.1032L6.24354 8.89354C6.56274 8.57434 6.94169 8.32113 7.35875 8.14838C7.7758 7.97563 8.2228 7.88672 8.67422 7.88672C9.12564 7.88672 9.57264 7.97563 9.98969 8.14838C10.4068 8.32113 10.7857 8.57434 11.1049 8.89354"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function SpinnerIcon() {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 3V6"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.864 5.63672L16.7427 7.75804"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 12H18.5"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.864 18.3635L16.7427 16.2422"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 21V18"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.13611 18.3635L8.25743 16.2422"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12H6.5"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.13611 5.63672L8.25743 7.75804"
        stroke="#54ABDB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function DashboardIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 3H3V10H10V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 3H14V10H21V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 14H14V21H21V14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14H3V21H10V14Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function UserCircle({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeMiterlimit="10"
      />
      <path
        d="M12 15C14.0711 15 15.75 13.3211 15.75 11.25C15.75 9.17893 14.0711 7.5 12 7.5C9.92893 7.5 8.25 9.17893 8.25 11.25C8.25 13.3211 9.92893 15 12 15Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeMiterlimit="10"
      />
      <path
        d="M5.9812 18.6913C6.54615 17.5806 7.40744 16.6478 8.46973 15.9963C9.53202 15.3448 10.7539 15 12 15C13.2462 15 14.468 15.3448 15.5303 15.9963C16.5926 16.6478 17.4539 17.5806 18.0189 18.6913"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function PlusCircle({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeMiterlimit="10"
      />
      <path
        d="M8.25 12H15.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.25V15.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClipboardText({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9 14.25H15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.25H15"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.0002 3.75H18.75C18.9489 3.75 19.1397 3.82902 19.2803 3.96967C19.421 4.11032 19.5 4.30109 19.5 4.5V20.25C19.5 20.4489 19.421 20.6397 19.2803 20.7803C19.1397 20.921 18.9489 21 18.75 21H5.25C5.05109 21 4.86032 20.921 4.71967 20.7803C4.57902 20.6397 4.5 20.4489 4.5 20.25V4.5C4.5 4.30109 4.57902 4.11032 4.71967 3.96967C4.86032 3.82902 5.05109 3.75 5.25 3.75H8.9998"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 6.75V6C8.25 5.00544 8.64509 4.05161 9.34835 3.34835C10.0516 2.64509 11.0054 2.25 12 2.25C12.9946 2.25 13.9484 2.64509 14.6517 3.34835C15.3549 4.05161 15.75 5.00544 15.75 6V6.75H8.25Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Folder({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.3333 19.5H3.69231C3.50886 19.4995 3.33308 19.4264 3.20337 19.2966C3.07365 19.1669 3.00054 18.9911 3 18.8077V7.5H20.25C20.4489 7.5 20.6397 7.57902 20.7803 7.71967C20.921 7.86032 21 8.05109 21 8.25V18.8333C21 19.0101 20.9298 19.1797 20.8047 19.3047C20.6797 19.4298 20.5101 19.5 20.3333 19.5V19.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 7.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H8.68934C8.78783 4.5 8.88536 4.5194 8.97635 4.55709C9.06735 4.59478 9.15003 4.65003 9.21967 4.71967L12 7.5"
        fill="currentColor"
      />
      <path
        d="M3 7.5V5.25C3 5.05109 3.07902 4.86032 3.21967 4.71967C3.36032 4.57902 3.55109 4.5 3.75 4.5H8.68934C8.78783 4.5 8.88536 4.5194 8.97635 4.55709C9.06735 4.59478 9.15003 4.65003 9.21967 4.71967L12 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CreditCardIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21 5.25H3C2.58579 5.25 2.25 5.58579 2.25 6V18C2.25 18.4142 2.58579 18.75 3 18.75H21C21.4142 18.75 21.75 18.4142 21.75 18V6C21.75 5.58579 21.4142 5.25 21 5.25Z"
        stroke="#767E94"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7495 15.75H18.7495"
        stroke="#767E94"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2495 15.75H12.7495"
        stroke="#767E94"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.24951 9.07812H21.7495"
        stroke="#767E94"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function GearIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5192 4.14147L9.75017 2.81511C9.65526 2.7437 9.54473 2.69588 9.42771 2.67558C9.31068 2.65528 9.19051 2.66307 9.07709 2.69833C8.52921 2.8699 7.99766 3.08982 7.48872 3.3555C7.38337 3.41076 7.29267 3.49029 7.2241 3.58751C7.15554 3.68474 7.11108 3.79687 7.09439 3.91467L6.78167 6.10381C6.66247 6.20948 6.54577 6.31938 6.43157 6.43351C6.3174 6.54768 6.20748 6.66441 6.10179 6.78371L6.10174 6.78375L3.91298 7.09675C3.79538 7.11337 3.68341 7.15771 3.5863 7.2261C3.4892 7.29449 3.40973 7.38498 3.35446 7.49011C3.08837 7.99884 2.86802 8.53021 2.69601 9.07795C2.66059 9.19152 2.65269 9.31189 2.67295 9.42912C2.69322 9.54635 2.74107 9.65708 2.81257 9.75217L4.1394 11.5213C4.12982 11.6803 4.12501 11.8405 4.12497 12.0019C4.12497 12.1634 4.12978 12.3237 4.1394 12.4828L4.1394 12.4828L2.81303 14.2518C2.74163 14.3468 2.69381 14.4573 2.6735 14.5743C2.6532 14.6913 2.661 14.8115 2.69625 14.9249C2.86782 15.4728 3.08774 16.0043 3.35343 16.5133C3.40869 16.6186 3.48821 16.7093 3.58544 16.7779C3.68266 16.8465 3.7948 16.8909 3.91259 16.9076L6.10174 17.2203C6.2074 17.3395 6.3173 17.4562 6.43143 17.5704C6.5456 17.6846 6.66233 17.7945 6.78163 17.9002L6.78167 17.9003L7.09467 20.089C7.11129 20.2066 7.15563 20.3186 7.22402 20.4157C7.29242 20.5128 7.38291 20.5923 7.48803 20.6475C7.99676 20.9136 8.52813 21.134 9.07587 21.306C9.18944 21.3414 9.30981 21.3493 9.42704 21.3291C9.54427 21.3088 9.655 21.2609 9.75009 21.1894L11.5192 19.8626C11.6782 19.8722 11.8384 19.877 11.9999 19.877C12.1613 19.877 12.3216 19.8722 12.4807 19.8626L12.4807 19.8626L14.2498 21.189C14.3447 21.2604 14.4552 21.3082 14.5722 21.3285C14.6893 21.3488 14.8094 21.341 14.9228 21.3058C15.4707 21.1342 16.0023 20.9143 16.5112 20.6486C16.6166 20.5933 16.7073 20.5138 16.7758 20.4166C16.8444 20.3193 16.8889 20.2072 16.9055 20.0894L17.2183 17.9003C17.3375 17.7946 17.4542 17.6847 17.5684 17.5706C17.6825 17.4564 17.7925 17.3397 17.8981 17.2204L17.8982 17.2203L20.087 16.9073C20.2046 16.8907 20.3165 16.8464 20.4136 16.778C20.5107 16.7096 20.5902 16.6191 20.6455 16.514C20.9116 16.0052 21.1319 15.4739 21.3039 14.9261C21.3393 14.8126 21.3472 14.6922 21.327 14.575C21.3067 14.4577 21.2589 14.347 21.1874 14.2519L19.8605 12.4828C19.8701 12.3238 19.8749 12.1636 19.875 12.0021C19.875 11.8407 19.8702 11.6804 19.8605 11.5213L19.8605 11.5213L21.1869 9.75225C21.2583 9.65733 21.3061 9.54681 21.3264 9.42978C21.3467 9.31276 21.3389 9.19258 21.3037 9.07916C21.1321 8.53129 20.9122 7.99974 20.6465 7.4908C20.5912 7.38544 20.5117 7.29474 20.4145 7.22618C20.3173 7.15761 20.2051 7.11315 20.0873 7.09647L17.8982 6.78375C17.7925 6.66454 17.6826 6.54784 17.5685 6.43364C17.4543 6.31948 17.3376 6.20955 17.2183 6.10386L17.2183 6.10381L16.9053 3.91505C16.8886 3.79745 16.8443 3.68548 16.7759 3.58838C16.7075 3.49127 16.617 3.41181 16.5119 3.35654C16.0032 3.09045 15.4718 2.8701 14.9241 2.69809C14.8105 2.66267 14.6901 2.65476 14.5729 2.67503C14.4557 2.69529 14.3449 2.74315 14.2498 2.81464L12.4808 4.14147C12.3217 4.1319 12.1615 4.12709 12.0001 4.12704C11.8386 4.12704 11.6783 4.13186 11.5192 4.14148L11.5192 4.14147Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
export function SignOutIcon({ className }: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.3135 8.0625L20.2499 12L16.3135 15.9375"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 12H20.2472"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H9.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function EyeCloseIcon({ className }: IconProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.60598 14.08C9.72673 14.0283 9.85648 14.0009 9.98782 13.9993C10.1192 13.9978 10.2495 14.0221 10.3714 14.071C10.4934 14.1198 10.6045 14.1922 10.6984 14.284C10.7924 14.3758 10.8673 14.4852 10.919 14.606L9.99999 15L10.92 14.606L10.923 14.614L10.944 14.659C10.964 14.701 10.995 14.767 11.038 14.853C11.124 15.025 11.257 15.277 11.438 15.582C11.9151 16.3839 12.4748 17.1336 13.108 17.819C13.2977 18.0231 13.4945 18.2206 13.698 18.411C15.18 19.8 17.251 21 20 21C21.1017 21.0049 22.1944 20.8006 23.22 20.398C24.447 19.915 25.474 19.188 26.316 18.4C27.4412 17.3307 28.3667 16.0693 29.049 14.675L29.076 14.617L29.081 14.606C29.1879 14.366 29.3851 14.1777 29.6297 14.0819C29.8744 13.9861 30.1469 13.9904 30.3884 14.094C30.6299 14.1975 30.8209 14.3919 30.9202 14.6352C31.0195 14.8785 31.0191 15.151 30.919 15.394L30.917 15.399L30.913 15.407L30.902 15.433L30.862 15.52C30.6398 15.9825 30.3924 16.4325 30.121 16.868C29.6213 17.671 29.0485 18.4262 28.41 19.124L29.207 19.921C29.3946 20.1085 29.5001 20.3629 29.5002 20.6281C29.5003 20.8934 29.395 21.1478 29.2075 21.3355C29.02 21.5231 28.7656 21.6286 28.5003 21.6287C28.2351 21.6288 27.9806 21.5235 27.793 21.336L26.953 20.496C26.3625 20.9747 25.7273 21.3953 25.056 21.752L25.838 22.954C25.9118 23.064 25.9629 23.1876 25.9886 23.3176C26.0142 23.4475 26.0137 23.5813 25.9872 23.7111C25.9607 23.8409 25.9086 23.9641 25.8341 24.0736C25.7595 24.1831 25.664 24.2767 25.553 24.349C25.442 24.4212 25.3177 24.4707 25.1874 24.4946C25.0571 24.5184 24.9233 24.5161 24.7939 24.4878C24.6645 24.4596 24.542 24.4058 24.4335 24.3298C24.325 24.2538 24.2327 24.157 24.162 24.045L23.176 22.531C22.497 22.739 21.772 22.886 21 22.955V24.5C21 24.7652 20.8946 25.0196 20.7071 25.2071C20.5196 25.3946 20.2652 25.5 20 25.5C19.7348 25.5 19.4804 25.3946 19.2929 25.2071C19.1053 25.0196 19 24.7652 19 24.5V22.956C18.225 22.886 17.5 22.739 16.823 22.531L15.838 24.045C15.6901 24.2595 15.4643 24.4078 15.2087 24.4583C14.9532 24.5089 14.6879 24.4577 14.4695 24.3156C14.2511 24.1736 14.0968 23.9519 14.0393 23.6978C13.9819 23.4437 14.0259 23.1771 14.162 22.955L14.944 21.752C14.244 21.382 13.612 20.952 13.047 20.495L12.207 21.335C12.0184 21.5171 11.7658 21.6179 11.5036 21.6157C11.2414 21.6134 10.9906 21.5082 10.8052 21.3228C10.6198 21.1374 10.5146 20.8866 10.5123 20.6244C10.51 20.3622 10.6108 20.1096 10.793 19.921L11.59 19.124C10.8826 18.3501 10.256 17.5061 9.71999 16.605C9.50588 16.2454 9.30866 15.876 9.12899 15.498C9.11781 15.4741 9.10681 15.4501 9.09599 15.426L9.08599 15.405L9.08399 15.398L9.08298 15.396C9.07999 15.396 9.07999 15.394 9.99999 15L9.08099 15.395C9.0291 15.2742 9.00153 15.1445 8.99984 15.0131C8.99815 14.8816 9.02237 14.7512 9.07113 14.6292C9.11989 14.5071 9.19223 14.3959 9.284 14.3018C9.37577 14.2078 9.48519 14.1317 9.60598 14.08Z"
        fill="#637381"
      />
    </svg>
  )
}

export function CautionIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.04 10.8666L9.92665 2.38663C9.50646 1.72929 8.78014 1.33154 7.99999 1.33154C7.21983 1.33154 6.49351 1.72929 6.07332 2.38663L0.959986 10.8666C0.59235 11.4795 0.579643 12.2419 0.926652 12.8666C1.32797 13.5701 2.07681 14.0031 2.88665 14H13.1133C13.9177 14.0085 14.6652 13.5865 15.0733 12.8933C15.4307 12.2617 15.418 11.4861 15.04 10.8666ZM7.99999 11.3333C7.6318 11.3333 7.33332 11.0348 7.33332 10.6666C7.33332 10.2984 7.6318 9.99996 7.99999 9.99996C8.36818 9.99996 8.66665 10.2984 8.66665 10.6666C8.66665 11.0348 8.36818 11.3333 7.99999 11.3333ZM7.99999 9.33329C8.36818 9.33329 8.66665 9.03482 8.66665 8.66663V5.99996C8.66665 5.63177 8.36818 5.33329 7.99999 5.33329C7.6318 5.33329 7.33332 5.63177 7.33332 5.99996V8.66663C7.33332 9.03482 7.6318 9.33329 7.99999 9.33329Z"
        fill="#FF4F4F"
      />
    </svg>
  )
}
