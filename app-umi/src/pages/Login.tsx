import React, { useEffect } from 'react'
import { useHistory } from 'umi'
import axios from 'axios'

export default function Login() {
    const history = useHistory()
    useEffect(() => {
        axios.get('/users').then(res => {
            console.log('res===========', res)
        })
    }, [])
    return (
        <>
            <div onClick={() => {
                localStorage.setItem('token', 'sabhjfdgdhs')
                history.push('/center')
            }}>Login</div>
        </>
    )
}
