import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import { useArticleContext } from 'src/contexts/ArticleContext';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator/Separator';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = () => {
	const { articleState, setArticleState } = useArticleContext();

	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
	const [selectedFont, setSelectedFont] = useState<OptionType>(
		articleState.fontFamilyOption
	);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(
		articleState.fontSizeOption
	);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(
		articleState.fontColor
	);
	const [selectedBackgroundColor, setSelectedBackgroundColor] =
		useState<OptionType>(articleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(
		articleState.contentWidth
	);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isFormOpen,
		rootRef,
		onChange: setIsFormOpen,
	});

	const handleOpenFormClick = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleSelectFont = (value: OptionType) => {
		setSelectedFont(value);
	};
	const handleSelectFontSize = (value: OptionType) => {
		setSelectedFontSize(value);
	};
	const handleSelectFontColor = (value: OptionType) => {
		setSelectedFontColor(value);
	};
	const handleSelectBackgroundColor = (value: OptionType) => {
		setSelectedBackgroundColor(value);
	};
	const handleSelectContentWidth = (value: OptionType) => {
		setSelectedContentWidth(value);
	};

	const resetForm = () => {
		setArticleState(defaultArticleState);
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
	};

	const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setArticleState({
			contentWidth: selectedContentWidth,
			fontColor: selectedFontColor,
			backgroundColor: selectedBackgroundColor,
			fontFamilyOption: selectedFont,
			fontSizeOption: selectedFontSize,
		});
		setIsFormOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleOpenFormClick} />
			<aside
				ref={rootRef}
				className={clsx([
					styles.container,
					{ [styles.container_open]: isFormOpen },
				])}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						onChange={handleSelectFont}
						selected={selectedFont}
						options={fontFamilyOptions}
					/>
					<RadioGroup
						name={''}
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleSelectFontSize}
						title={'Размер шрифта'}
					/>
					<Select
						title='Цвет шрифта'
						onChange={handleSelectFontColor}
						selected={selectedFontColor}
						options={fontColors}
					/>
					<Separator style='light' />
					<Select
						title='Цвет фона'
						onChange={handleSelectBackgroundColor}
						selected={selectedBackgroundColor}
						options={backgroundColors}
					/>
					<Select
						title='Ширина контента'
						onChange={handleSelectContentWidth}
						selected={selectedContentWidth}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
