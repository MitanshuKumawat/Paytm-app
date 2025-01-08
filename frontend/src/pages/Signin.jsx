import {Heading} from '../components/Heading';
import {SubHeading} from '../components/SubHeading';
import {Button} from '../components/Button';
import {BottomWarning} from '../components/BottomWarning';
import {Inputbox} from '../components/Inputbox';
import { useState } from 'react';
import axios from 'axios';

export const Signin = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <Inputbox onChange={(e)=>{setEmail(e.target.value)}} placeholder="mitanshu@gmail.com" label={"Email"} />
        <Inputbox onChange={(e)=>{setPassword(e.target.value)}} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
            const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
                username:email,
                password
            });
            localStorage.setItem('token', response.data.token); 
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}