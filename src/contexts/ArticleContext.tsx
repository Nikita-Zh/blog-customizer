import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { type ArticleStateType } from 'src/constants/articleProps';

export const articleStateKey = 'articleStateKey' as const;

type ArticleContextType = {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};
const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider = ({ children }: { children: ReactNode }) => {
	const [state, setState] = useState<ArticleStateType>((): ArticleStateType => {
		const storageState = window.localStorage.getItem(articleStateKey);
		try {
			return storageState ? JSON.parse(storageState) : defaultArticleState;
		} catch {
			return defaultArticleState;
		}
	});
	useEffect(() => {
		try {
			const storageState = JSON.stringify(state);
			window.localStorage.setItem(articleStateKey, storageState);
		} catch {}
	}, [state]);

	return (
		<ArticleContext.Provider
			value={{ articleState: state, setArticleState: setState }}>
			{children}
		</ArticleContext.Provider>
	);
};

export const useArticleContext = (): ArticleContextType => {
	const context = useContext(ArticleContext);
	if (!context) {
		throw new Error('useArticleContext must be used within an ArticleProvider');
	}
	return context;
};
