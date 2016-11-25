import { h } from 'preact';
import { style } from 'glamor';
import { styles } from './styles';

export default function Box(props) {
    const st = style({
        margin: `${styles.scale[props.m]}px`,
        padding: `${styles.scale[props.p]}px`,
    });

    return <div {...props} {...st} />;
}
