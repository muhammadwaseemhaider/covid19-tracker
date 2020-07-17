import React, {useState, useEffect } from 'react';
import { FetchCountryDailyData } from '../../api/FetchCountryDailyData';
import { useContext } from 'react';
import { GlobalContext } from '../../GlobalState';
import { Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

export const CountryChart = () => {
    const [dailyCountryData, setDailyCountryData] = useState();
    const { getCountry } = useContext(GlobalContext);

    const country = getCountry();

    console.log("CountryChart Country" + country)

    useEffect(() => {
        try {
        const fetchCountryAPI = async () => {

         const initialCountryDailyData = (await FetchCountryDailyData());
          setDailyCountryData(initialCountryDailyData);
        }
          fetchCountryAPI();   
        } catch (error) {
          console.log(error);
        }
    }, [] );
    console.log("CountryChart UseEffect Country")
    console.log(dailyCountryData);
    
    if ((!country) || (!dailyCountryData))
     return null;
    
    const barCountryChart = (
        ((country) && (dailyCountryData))
         ? (
            <Bar 
              data={{
                  labels: dailyCountryData.map((date) => date ),
                  datasets: [{
                      data: dailyCountryData.map((confirmed) => confirmed),
                      label: 'infected',
                      borderColor: '#3333ff',
                      fill: true,
                  }, {
                      data: dailyCountryData.map((deaths) => deaths),
                      label: 'Deaths',
                      borderColor: 'red',
                      backgroundColor: 'rgba(255,0,0,0.5)',
                      fill: true,
                  }],
              }}
          /> ) : null
      );

    return (
        <div className={styles.container}>
          {barCountryChart}
        </div>
     )
}

export default CountryChart;