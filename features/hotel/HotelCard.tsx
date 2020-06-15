import { Button, Card, CardActionArea, CardContent, CardMedia, CardActions, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Hotel } from 'models/hotel/@types';
import React, { FC } from 'react';

export interface HotelCardProps {
    hotel: Hotel;
}

const HotelCard: FC<HotelCardProps> = (props) => {
    const classes = useStyles();
    const { hotel } = props;
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={hotel.thumbnail}
                    title={hotel.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{hotel.name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{hotel.description}</Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" >View</Button>
            </CardActions>
        </Card>
    )
}

const useStyles = makeStyles<Theme>((theme) => {
    return (createStyles({
        media: {
            height: 250
        },
        root: {
            maxWidth: 345,
        },
    }))
})

export default HotelCard