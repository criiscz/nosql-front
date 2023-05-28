import {useProgressBar} from 'react-aria';

function ProgressBar(props: ProgressBarProps) {
  let {
    label,
    showValueLabel = !!label,
    value,
    minValue = 0,
    maxValue = 100
  } = props;
  let {
    progressBarProps,
    labelProps
  } = useProgressBar(props);

  // Calculate the width of the progress bar as a percentage
  let percentage = (value - minValue) / (maxValue - minValue);
  let barWidth = `${Math.round(percentage * 100)}%`;

  return (
    <div {...progressBarProps} style={{width: 200}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {label &&
          (
            <span {...labelProps}>
    {label}
    </span>
          )}
        {showValueLabel &&
          (
            <span>
      {progressBarProps['aria-valuetext']}
    </span>
          )}
      </div>
      <div style={{height: 10, background: 'lightgray'}}>
        <div style={{width: barWidth, height: 10, background: 'green', borderRadius: 50}}/>
      </div>
    </div>
  );
}

interface ProgressBarProps {
  label?: string,
  showValueLabel?: boolean,
  value: number,
  minValue?: number,
  maxValue?: number
}

export default ProgressBar;