import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import {Users} from '../components/Users';
import axios from "axios";

export const Dashboard = ()=>{
    const [balance,setBalance] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/account/balance',{
            headers:{
                Authorization: "Bearer "+localStorage.getItem('token')
            }
        }).then(response=>{
                setBalance(response.data.balance.toFixed(2))   // toFixed(2) --> 2 decimal places
            })
    },[]);

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={balance}/>
            <Users/>
        </div>
    </div>
}