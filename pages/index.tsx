import { Box, Container, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Header from 'features/Header';
import HotelCard from 'features/hotel/HotelCard';
import HotelModel from 'models/hotel';
import { Hotel } from 'models/hotel/@types';
import { GetStaticProps } from 'next';
import React, { FC } from 'react';
import { Head } from 'next/document';
import { useRouter } from 'next/router';

export interface HomeProps {
	hotels: Hotel[];
}

const Home: FC<HomeProps> = (props) => {
	const classes = useStyles();
	const { hotels } = props;
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Hotel Bookings - NextJS</title>
				<meta name="description" content={"Hotel Booking application on nextJS"} />
				<meta name="og:title" content="Hotel Bookings - NextJS" />
				<meta name="og:description" content={"Hotel Booking application on nextJS"} />
				<meta name="og:url" content={router.route} />
				<meta name="og:image" content={"https://i.ytimg.com/vi/Fnw3lNeH-XI/maxresdefault.jpg"} />
				<meta name="og:type" content="article" />
				<meta property="article:author" content="Siraj Alam" />
				<meta property="keywords" content="reactjs, javascript, foss, open-source, date-library, dayjs, momentJS" ></meta>
				<meta property="og:locale" content="en_US" />
			</Head>
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