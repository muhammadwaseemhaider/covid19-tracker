import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';
import axios from 'axios';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalState';


export const Cards = () => {
    const [FetchedData, setFetchedData] = useState({});
    const { country } = useContext(GlobalContext);
    const url = 'https://covid19.mathdro.id/api';

    let changeableURL = url;
    if (country !== "Global")
    changeableURL = `${url}/countries/${country}`
     
    useEffect(() => {
        const FetchData = async () => {

            try {
                const initialData= await axios.get(changeableURL);
                setFetchedData(initialData);     
            } catch (error) {
                console.log(error);
            } 
        }
        FetchData();
    }, [changeableURL, country]);

    const {data={}} = FetchedData;
    const {confirmed=0, recovered=0, deaths=0, lastUpdate={} } = data || {};

    console.log(confirmed.value, recovered.value, deaths.value, lastUpdate );
    if (!confirmed.value) 
    return "Loading...";

    return (
        <div  className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5" >
                            <CountUp start={0} end={confirmed.value} duration={1.5} separator="," />
                         </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5" >
                            <CountUp start={0} end={recovered.value} duration={1.5} separator="," />
                         </Typography>
                         <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of recoveries from COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5" >
                            <CountUp start={0} end={deaths.value} duration={1.5} separator="," />
                         </Typography> 
                         <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;