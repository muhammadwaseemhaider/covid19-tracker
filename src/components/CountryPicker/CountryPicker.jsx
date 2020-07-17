import React, { useState, useEffect, useContext} from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { GlobalContext } from '../../GlobalState';
import axios from 'axios';

export const CountryPicker = () => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    const { setCountry } = useContext(GlobalContext);
    const urlCountries = 'https://covid19.mathdro.id/api/countries';

    useEffect(() => {
        const FetchCountries = async () => {
        try {
            const {data}  = await axios.get(urlCountries);
            const  {countries} = data;
            console.log("Country Picker ", data, "Countries ", countries)

            if (countries) {
                console.log("Country inside ", data, "Countryitems ", countries)
                const countryData = Object.values(countries)
                .map((cData) => (
                {
                    country: cData.name,
                    code: cData.iso3
                }));
                setFetchedCountries(countryData);
            }

        }
        catch (error) {
            console.log(error);
        }}
        FetchCountries();
    }, []);
        
    return ( 
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange={(e) => setCountry(e.target.value)} >
                <option value="Global">Global</option>
                {fetchedCountries.map(({country, code, id}) => <option key={code} value={country}>{country} </option>)}          
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;