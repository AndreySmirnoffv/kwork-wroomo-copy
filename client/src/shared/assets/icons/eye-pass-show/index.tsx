import { IconsProps } from '../model/index.type';

export const EyePassShowIcon = ({ width = 18, height = 18, size, ...props }: IconsProps) => {
	const wdth = size ?? width;
	const hght = size ?? height;

	return (
    <svg
      width={wdth}
      height={hght}
      viewBox='0 0 19 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      strokeWidth='1.5'
      color='#ffffff'
			{...props}
			>
      <g clipPath='url(#clip0_5556_1764)'>
        <path
          d='M1.25 9C1.25 9 4.25 3 9.5 3C14.75 3 17.75 9 17.75 9C17.75 9 14.75 15 9.5 15C4.25 15 1.25 9 1.25 9Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'></path>
        <path
          d='M9.5 11.25C10.7426 11.25 11.75 10.2426 11.75 9C11.75 7.75736 10.7426 6.75 9.5 6.75C8.25736 6.75 7.25 7.75736 7.25 9C7.25 10.2426 8.25736 11.25 9.5 11.25Z'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'></path>
      </g>
      <defs>
        <clipPath id='clip0_5556_1764'>
          <rect width='18' height='18' fill='white' transform='translate(0.5)'></rect>
        </clipPath>
      </defs>
    </svg>
  );
};
