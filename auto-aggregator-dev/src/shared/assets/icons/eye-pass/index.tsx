import { IconsProps } from '../model/index.type';

export const EyePassIcon = ({ width = 18, height = 18, size, ...props }: IconsProps) => {
  const wdth = size ?? width;
  const hght = size ?? height;

  return (
    <svg
      width={wdth}
      height={hght}
      viewBox='0 0 18 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='#ffffff'
      strokeWidth='1.5'
      {...props}>
      <g clipPath='url(#clip0_5556_2476)'>
        <path
          d='M13.455 13.455C12.1729 14.4323 10.6118 14.9737 9 15C3.75 15 0.75 9.00002 0.75 9.00002C1.68292 7.26144 2.97685 5.74247 4.545 4.54502M7.425 3.18002C7.94125 3.05918 8.4698 2.99877 9 3.00002C14.25 3.00002 17.25 9.00002 17.25 9.00002C16.7947 9.85172 16.2518 10.6536 15.63 11.3925M10.59 10.59C10.384 10.8111 10.1356 10.9884 9.85961 11.1114C9.58362 11.2343 9.28568 11.3005 8.98357 11.3058C8.68146 11.3111 8.38137 11.2555 8.10121 11.1424C7.82104 11.0292 7.56654 10.8608 7.35288 10.6471C7.13923 10.4335 6.97079 10.179 6.85763 9.89881C6.74447 9.61865 6.68889 9.31856 6.69423 9.01645C6.69956 8.71434 6.76568 8.4164 6.88866 8.1404C7.01163 7.86441 7.18894 7.61601 7.41 7.41002'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'></path>
        <path d='M0.75 0.75L17.25 17.25' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round'></path>
      </g>
      <defs>
        <clipPath id='clip0_5556_2476'>
          <rect width='18' height='18' fill='white'></rect>
        </clipPath>
      </defs>
    </svg>
  );
};
