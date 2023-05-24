import React from 'react'
import './index.less'
import { NavLink } from 'umi'
export default function index(props: any) {
    return (
        <div>
            {props.children}
            <ul>
                <li>
                    <NavLink to='/film' activeClassName='active'>Film</NavLink>
                </li>
                <li>
                    <NavLink to='/cinema' activeClassName='active'>Cinema</NavLink>
                </li>
                <li>
                    <NavLink to='/center' activeClassName='active'>Center</NavLink>
                </li>
            </ul>
        </div>
    )
}
