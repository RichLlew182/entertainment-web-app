import { fetchAllData } from "./fetchAllData.js";
import { filterData } from "./filterData.js";

export async function getData(input) {

    console.log({ input })

    const url = "./data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        localStorage.setItem('movie-data', JSON.stringify(json))

        if (input === undefined) {
            fetchAllData(json)
        } else {
            filterData(json, input)
        }

    } catch (error) {
        console.error(error.message);
    }
}