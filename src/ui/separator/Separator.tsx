import styles from './index.module.scss';
import clsx from 'clsx';

export const Separator = ({ style }: { style?: 'dark' | 'light' }) => {
	return (
		<div
			className={clsx([
				styles.separator,
				{ [styles.light]: style === 'light' },
			])}></div>
	);
};
