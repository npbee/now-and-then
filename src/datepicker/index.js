import { Box, Text } from 'axs';
import { style, merge } from 'glamor';
import { h, Component } from 'preact';
import { colors } from '../colors';
import { styles } from '../styles';
import { MONTHS, weeksInMonth, addMonths, subtractMonths, isSameDay } from '../utils/date';
import { Flex } from 'axs-ui';
import { Chevron } from 'reline';

function Day(props) {
    const { currentDate, currentMonth, day, onSelect } = props;
    const outside = currentMonth !== day.getMonth();

    return <Flex
        width={0.5}
        color={outside ? 'grey' : 'black'}
        bg={isSameDay(currentDate, day) ? 'blue3' : 'none'}
        p={[0, 2]}
        css={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRight: `1px solid ${colors.lightGrey}`,
            borderBottom: `1px solid ${colors.lightGrey}`,
            position: 'relative',
            cursor: 'pointer',
            '@media screen and (min-width:40em)': {
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                padding: styles.scale[2]
            },
            ':after': {
                content: '""',
                paddingBottom: '100%',
            },
            ':last-child': {
                borderRight: 'none',
            }
        }}
        onClick={onSelect.bind(null, day)}
    >
        <Text>{day.getDate()}</Text>
    </Flex>
}

function Week(props) {
    const { currentMonth, onDaySelect, week, currentDate } = props;

    return <Flex
        css={{
            borderLeft: `1px solid ${colors.lightGrey}`,
            borderRight: `1px solid ${colors.lightGrey}`,
            ':first-child': {
                borderTop: `1px solid ${colors.lightGrey}`,
            }
        }}>
        {week.map(day => <Day
            currentMonth={currentMonth}
            onSelect={onDaySelect}
            day={day}
            currentDate={currentDate}
        />)}
    </Flex>;
}

const Weekday = props =>
    <Flex
        {...props}
        align='center'
        width={0.5}
        gray9
        py2
        css={{
            justifyContent: 'center',
            alignItems: 'center',
            ':after': {
                content: '""',
                display: 'block',
                paddingBottom: '25%',
            },
            '@media screen and (min-width:40em)': {
                justifyContent: 'flex-start',
                padding: styles.scale[2]
            },
        }}
    />;

function Weekdays(props) {
    const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    return <Flex bgGray2>
        {weekdays.map(day => <Weekday>{day}</Weekday>)}
    </Flex>;
}

const Arrow = props => <Box {...props} p2 css={{ cursor: 'pointer' }} />;

function Header(props) {
    const { month, year, onNextMonthSelect, onPreviousMonthSelect } = props;
    const monthString = MONTHS[month];

    return <Flex
        justify='space-between'
        css={{ justifyContent: 'space-between' }}
        align='center'
        display='flex'
        white
        bgBlue
    >
        <Arrow onClick={onPreviousMonthSelect}>
            <Chevron left />
        </Arrow>
        <Text
            caps
            css={{ fontWeight: 200, letterSpacing: 4 }}
            white
        >{monthString} {year}</Text>
        <Arrow onClick={onNextMonthSelect}>
            <Chevron right />
        </Arrow>
    </Flex>;
}

export default class DatePicker extends Component {
    state = {
        referenceDate: this.props.date,
    };

    handleNextMonthSelect = () => {
        this.setState({
            referenceDate: addMonths(1, this.state.referenceDate)
        });
    };

    handlePrevMonthSelect = () => {
        this.setState({
            referenceDate: subtractMonths(1, this.state.referenceDate)
        });
    };

    static defaultProps = {
        date: new Date()
    };

    render(props, state) {
        const { referenceDate } = state;
        const { date, onDaySelect } = props;
        const currentMonth = referenceDate.getMonth();
        const currentYear = referenceDate.getFullYear();
        const weeks = weeksInMonth(referenceDate);

        return <Box width={1} size={4}>
            <Header
                month={currentMonth}
                year={currentYear}
                onPreviousMonthSelect={this.handlePrevMonthSelect}
                onNextMonthSelect={this.handleNextMonthSelect}
            />
            <Weekdays />
            {weeks.map(week => <Week currentMonth={currentMonth} currentDate={date} week={week} onDaySelect={onDaySelect} />)}
        </Box>;
    }
}
