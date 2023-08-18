import React from 'react'
import { useRequest } from 'ahooks'
import axios from 'axios'

async function getData() {
    const res = await axios.get('/test.json')
    return res
}

export default function UseRequestDemo() {
    const { data, error, loading } = useRequest(getData)
    console.log(data?.data, error, loading )
    return (
        <div>UseRequestDemo</div>
    )
}
