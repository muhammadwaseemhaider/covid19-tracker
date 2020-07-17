import React from 'react';

import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';

import styles from './App.module.css';
import { GlobalProvider } from './GlobalState';

function App() {

    return (
        <GlobalProvider >
        <div className={styles.container}>
            <Cards />
            <CountryPicker/> 
            <Chart />
        </div>
        </ GlobalProvider>
        )
}
export default App;