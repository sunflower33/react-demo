import React from 'react'
import { useParams } from 'umi'

interface IParams {
    id: string
}

export default function Detail() {
    const params = useParams()
    return (
        <div>{params.id}</div>
    )
}
