import React, { FC } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from 'features/Header';
import Link from 'next/link';

export interface AppProps { }

const App: FC<AppProps> = (props) => {
	const classes = useStyles();
	return (
		<Box>
			<Header />
			<Link href={'page1'} >
				<a>Page</a>
			</Link>
		</Box>
	)
}

const useStyles = makeStyles<Theme>((theme) => {
	return (createStyles({

	}))
})

export default App