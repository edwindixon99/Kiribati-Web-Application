import axios from 'axios'
import { useState, useEffect } from 'react'


export const GetData = (searchParam, initialState) => {
    const [data, setData] = useState(initialState)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchTranslations() {
            axios({
            "method": "GET",
            "url": "http://kiribatiwebapi-env.eba-txwahgpx.ap-southeast-2.elasticbeanstalk.com/api/v1/kiribati",
            // headers: {
            //   'Access-Control-Allow-Origin' : '*',
            //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            //   },
            "params": {
                "q": searchParam
            }
            })
            .then((response) => {
            setData(response.data)
            setLoading(false)
            })
            .catch((error) => {
            console.log(error)
            })
            
        }
        if (searchParam) {
            fetchTranslations()
        }
        
    }, [searchParam])

    return { data, loading }
}