import styles from './CountryList.module.css'
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";


export default function CountryList({ cities, isLoading }) {

    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message="Add your first city" />

    const countries = cities.reduce((arr, cur) =>  {
        const newArr = [...arr]
        if (!newArr.find(item => item.country === cur.country)) newArr.push(cur)
        return newArr
    } ,[])

    console.log(countries)

    return (
        <ul>
            {countries.map((country, index) => <CountryItem country={country} key={index}/>)}
        </ul>
    )
}