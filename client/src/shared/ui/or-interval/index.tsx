import { IntervalProps } from './model/index.types';
import { IntervalContainerStyle } from './style';

export const OrInterval = ({ text, pos = 'vertical', margin = 15 }: IntervalProps) => {
  return (
    <IntervalContainerStyle text={text} pos={pos} margin={margin}>
      {text && text}
    </IntervalContainerStyle>
  );
};
