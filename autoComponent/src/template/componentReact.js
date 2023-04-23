const componentReact = `
import React, { CSSProperties, PropsWithChildren } from "react";
import styles from "./index.module.less";
interface IProps {
	style?: CSSProperties;
}

/**
 * @description: UPER-COMPONENT-NAME
 * @param {IProps} props
 * @return {*}
 * @Date: 2021-09-01 15:12:00
 */

export default function UPER-COMPONENT-NAME(props: PropsWithChildren<IProps>) {
	const { style } = props;

	return (
		<div className={styles.LOWER-COMPONENT-NAMEWrap} style={style}>
			// your code
		</div>
	);
}
`
module.exports = componentReact
