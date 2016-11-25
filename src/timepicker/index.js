import { Box, Text } from 'axs';
import { styles } from '../styles';
import { colors } from '../colors';
import { h, Component } from 'preact';

const Input = ({ css, ...rest }) => <Box
    is='input'
    type="number"
    inputmode='numeric'
    pattern='[0-9]*'
    border='none'
    width={1}
    size={2}
    center
    py1
    px2
    css={{ outline: 'none', ...css }}
    border
    borderColor='gray4'
    {...rest}
/>;

const SmallHeader = ({ css, ...rest }) => <Text
    is='h2'
    width={1}
    px2
    py1
    caps
    size={4}
    css={{ marginRight: 10, fontWeight: 200, letterSpacing: 4, css}}
    center
    {...rest}
/>;

export default class Timepicker extends Component {

    handleHourChange = event =>
        this.props.onChange([event.target.value, this.props.time[1]]);

    handleMinutesChange = event => this.props.onChange([this.props.time[0], event.target.value]);

    render(props) {
        const { time } = props;
        const [hours, minutes] = time;

        return <Box>
            <Box
                display='flex'
                bgBlue
                white
                css={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                <SmallHeader>Hours</SmallHeader>
                <SmallHeader>Minutes</SmallHeader>
            </Box>
            <Box
                display='flex'
                css={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                    <Input
                        value={hours}
                        min={0}
                        max={23}
                        onChange={this.handleHourChange}
                    />
                    <Input
                        value={minutes}
                        min={0}
                        max={59}
                        onChange={this.handleMinutesChange}
                    />
            </Box>
        </Box>
    }
}
