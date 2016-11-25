import { Box, Text } from 'axs';
import { format } from 'app/utils/date';
import { styles } from '../styles';
import { colors } from '../colors';
import { format as formatTime } from 'app/utils/time';
import { h, Component } from 'preact';
import DatePicker from 'app/datepicker';
import Timepicker from 'app/timepicker';
import { X } from 'reline';

const HeavyText = props => <Box
    css={{ cursor: 'pointer', opacity: props.dimmed ? 0.5 : 1, ...styles.typography }}
    display='inline-block'
    color='blue'
    bold={props.focused}>
    <Text {...props} />
</Box>;

const Absolute = props => <Box
    css={{ position: 'absolute', top: 'calc(100% + 35px)', zIndex: 2 }}
    bgWhite
    width={1}
    {...props}
/>;

export default function TimeAndDatePicker(props) {
    const {
        datepickerFocused,
        date,
        onClose,
        onDaySelect,
        onDatepickerToggle,
        onTimepickerToggle,
        timepickerFocused,
        time,
        onTimeChange,
        leadText
    } = props;

    const dateDisplay = <HeavyText onClick={onDatepickerToggle} focused={datepickerFocused} dimmed={timepickerFocused}>
        {format(date)}
    </HeavyText>;

    const timeDisplay = <HeavyText onClick={onTimepickerToggle} focused={timepickerFocused} dimmed={datepickerFocused}>
        {formatTime(time)}
    </HeavyText>;


    return <Box width={1} css={{ position: 'relative' }}>
        <Box
            display='flex'
            css={{ flexWrap: 'wrap', alignItems: 'center' }}
        >
            <Box mb2>
                <Text>
                    {leadText}&nbsp;
                </Text>
            </Box>
            <Box mb2>
                <Text>
                    {dateDisplay} at {timeDisplay}.
                </Text>
            </Box>
        </Box>
        {datepickerFocused &&
            <DatePicker date={date} onDaySelect={onDaySelect} />}

        {timepickerFocused &&
            <Timepicker time={time} onChange={onTimeChange} />}
    </Box>;
}
