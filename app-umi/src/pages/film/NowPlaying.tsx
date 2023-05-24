import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'umi'



export default function NowPlaying() {
    const [list, setList] = useState([])
    const history = useHistory()
    useEffect(() => {
        axios.get('https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1&k=9106829', {
            headers: {
                'X-Client-Info': '{ "a": "3000", "ch": "1002", "v": "5.2.1", "e": "16842207295073683521470465"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            setList(res.data.data.films)
            console.log(list)
        })
    }, [])
    return (
        <div>
            {list.map(item => (<li key={item.filmId} onClick={()=>{
                history.push(`/detail/${item.filmId}`)
            }}>{item.name}</li>))}
        </div>
    )
}
