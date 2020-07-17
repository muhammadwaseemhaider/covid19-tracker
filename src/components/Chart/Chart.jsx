import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalState';
import { Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

export const Chart = () => {
    const { country } = useContext(GlobalContext);
    const [dailyData, setDailyData] = useState({confirmed: 0, deaths: 0, date: '01/01/20'});
    const url = 'https://covid19.mathdro.id/api';
    const urlCountryDaily = 'https://pomber.github.io/covid19/timeseries.json';

    if (country === "Global")
        console.log(`${url}/daily`)
    else
        console.log(`${urlCountryDaily}${country}`)

    console.log("Chart Country "+country)

    useEffect(() => {
        const FetchDailyData = async () => {
            try {
                const { data } = await axios.get(`${url}/daily`);
        
                const initialDailyData = data.map((dailyData) => ({
                    confirmed: dailyData.confirmed.total,
                    deaths: dailyData.deaths.total,
                    date: dailyData.reportDate
                }));
                setDailyData(initialDailyData);
            } catch (error) {
                console.log(error);

            }
        }

        const FetchCountryDailyData = async () => {
            try {
                const { data } = await axios.get(urlCountryDaily)
                const initialCountryDailyData = data[country]
                .map(( {date, confirmed, deaths} ) => 
                      ( {date, 
                        confirmed, 
                        deaths}
                         )
                    );
                 setDailyData(initialCountryDailyData);  
            } catch (error) {
                console.log(error);
            }
        }
        
        if (country === "Global")
        FetchDailyData();
        else {
        FetchCountryDailyData();
        }
    }, [country]);

    if (dailyData)
    console.log(dailyData);

    const barGlobalChart = (
      dailyData.length
       ? (
          <Bar 
            data={{
                labels: dailyData.map(({date}) => date ),
                datasets: [{
                    data: dailyData.map(({confirmed}) => confirmed),
                    label: 'infected',
                    borderColor: '#3333ff',
                    backgroundColor: 'rgba(128,128,128,0.5)',
                    hoverBorderColor: '#000000',
                    hoverBackgroundColor: 'rgba(64,64,64,0.5)',
                    fill: true,
                }, {
                    data: dailyData.map(({deaths}) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    hoverBorderColor: 'red',
                    hoverBackgroundColor: 'rgba(255,0,0,0.6)',
                    fill: true,
                }],
            }}
        /> ) : null
    );
   



    return (
        <div className={styles.container}>
          {barGlobalChart}
        </div>
     )
}

export default Chart;