import { Box, Text } from 'axs';
import { Flex } from 'axs-ui';
import { h, render, Component } from 'preact';
import { format, diffDates } from './utils/date';
import { styles } from './styles';
import { colors } from './colors';
import DatePicker from './datepicker';
import DateTimePicker from './date-time-picker';
import { X, Triangle } from 'reline';

import './init';

class App extends Component {
    constructor(props) {
        super(props);

        const now = new Date();

        this.state = {
            now: {
                currentDate: now,
                datepickerFocused: false,
                timepickerFocused: false,
                currentTime: [now.getHours(), now.getMinutes()],
            },
            then: {
                currentDate: now,
                datepickerFocused: false,
                timepickerFocused: false,
                currentTime: [now.getHours(), now.getMinutes()],
            },
        };
    }

    handleClose = () => this.setState({
        now: {
            ...this.state.now,
            datepickerFocused: false,
            timepickerFocused: false
        },
        then: {
            ...this.state.then,
            datepickerFocused: false,
            timepickerFocused: false
        }
    });

    handleTimeChange = period => time => this.setState({
        [period]: {
            ...this.state[period],
            currentTime: time,
        }
    });

    handleDaySelect = period => date => this.setState({
        [period]: {
            ...this.state[period],
            currentDate: date,
            datepickerFocused: false,
        }
    });

    handleDatepickerToggle = period => () => {
        this.setState({
            now: {
                ...this.state.now,
                timepickerFocused: false,
                datepickerFocused: false,
            },
            then: {
                ...this.state.then,
                timepickerFocused: false,
                datepickerFocused: false,
            },
            [period]: {
                ...this.state[period],
                timepickerFocused: false,
                datepickerFocused: !this.state[period].datepickerFocused,
            },
        });
    };

    handleTimepickerToggle = period => () => {
        this.setState({
            now: {
                ...this.state.now,
                timepickerFocused: false,
                datepickerFocused: false,
            },
            then: {
                ...this.state.then,
                timepickerFocused: false,
                datepickerFocused: false,
            },
            [period]: {
                ...this.state[period],
                datepickerFocused: false,
                timepickerFocused: !this.state[period].timepickerFocused,
            },
        });
    };

    render(props, state) {
        const { now, then } = state;
        const {
            currentDate: nowCurrentDate,
            currentTime: nowCurrentTime,
            datepickerFocused: nowDatepickerFocused,
            timepickerFocused: nowTimepickerFocused
        } = now;

        const {
            currentDate: thenCurrentDate,
            currentTime: thenCurrentTime,
            datepickerFocused: thenDatepickerFocused,
            timepickerFocused: thenTimepickerFocused
        } = then;

        const [diffHours, diffMinutes] = diffDates(
            nowCurrentDate,
            nowCurrentTime,
            thenCurrentDate,
            thenCurrentTime
        );

        return <Flex
            justify='center'
            direction='column'
            css={{
                position: 'relative',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: 1200,
                ...styles.typography
            }}
            width={1}
            size={3}
        >
            <Box
                display='flex'
                css={{ justifyContent: 'space-around' }}
                p3
                border='bottom'
                borderColor='gray3'
                bgBlue1
            >
                <Triangle up size={32} stroke={colors.blue} />
                <Triangle right size={32} stroke={colors.blue} />
                <Triangle down size={32} stroke={colors.blue} />
                <Triangle left size={32} stroke={colors.blue} />
            </Box>
            <Box my3 p2>
                <DateTimePicker
                    date={nowCurrentDate}
                    time={nowCurrentTime}
                    datepickerFocused={nowDatepickerFocused}
                    timepickerFocused={nowTimepickerFocused}
                    onDaySelect={this.handleDaySelect('now')}
                    onTimeChange={this.handleTimeChange('now')}
                    onDatepickerToggle={this.handleDatepickerToggle('now')}
                    onTimepickerToggle={this.handleTimepickerToggle('now')}
                    leadText="Right now it's"
                />
            </Box>

            <Box mb3 p2>
                <DateTimePicker
                    date={thenCurrentDate}
                    time={thenCurrentTime}
                    datepickerFocused={thenDatepickerFocused}
                    timepickerFocused={thenTimepickerFocused}
                    onDaySelect={this.handleDaySelect('then')}
                    onTimeChange={this.handleTimeChange('then')}
                    onDatepickerToggle={this.handleDatepickerToggle('then')}
                    onTimepickerToggle={this.handleTimepickerToggle('then')}
                    leadText="Then it was"
                />
            </Box>

            <Box p2>
                <Text mb2>The difference is:</Text>
                <Flex wrap='wrap'>
                    <Text mb1><strong>{diffHours}</strong> hours(s) <Text is='span' gray6>and&nbsp;</Text></Text>
                    <Text><strong>{diffMinutes}</strong> minutes.</Text>
                </Flex>
            </Box>
        </Flex>;
    }
}


render(<App />, document.getElementById('root'));
