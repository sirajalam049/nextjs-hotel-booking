import React, { FC } from 'react'
import { Box, Grid, Container, Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Header from 'features/Header';
import { Hotel } from 'models/hotel/@types';
import HotelCard from 'features/hotel/HotelCard';
import { GetStaticProps } from 'next';
import { request } from 'resources/utils';
import HotelModel from 'models/hotel';

export interface HomeProps {
	hotels: Hotel[];
}

const Home: FC<HomeProps> = (props) => {
	const classes = useStyles();
	const { hotels } = props;
	return (
		<>
			<Header />
			<Container maxWidth={'lg'} >
				<div className={classes.root} >
					<Box mb={5} ><Typography variant={'h1'} align={'center'} >Hotels</Typography></Box>
					<Grid container justify={'center'} alignItems={'center'} spacing={4} >
						{
							hotels.map((hotel) => {
								return (
									<Grid item md={4} key={hotel.id} >
										<HotelCard hotel={hotel} />
									</Grid>
								)
							})
						}
					</Grid>
				</div>
			</Container>
		</>
	)
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {

	const hotels = await HotelModel.getItemList();

	return {
		props: {
			hotels
		}
	}
}

const useStyles = makeStyles<Theme>((theme) => {
	return (createStyles({
		root: {
			paddingTop: 64,
			paddingBottom: 120
		}
	}))
})

export default Home;