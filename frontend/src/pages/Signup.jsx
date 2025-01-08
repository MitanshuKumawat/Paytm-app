import {Heading} from '../components/Heading';
import {SubHeading} from '../components/SubHeading';
import {Button} from '../components/Button';
import {BottomWarning} from '../components/BottomWarning';
import {Inputbox} from '../components/Inputbox';
import { useState } from 'react';
import axios from 'axios';

export const Signup = ()=>{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <Inputbox onChange={(e)=>{
            setFirstName(e.target.value);
        }} placeholder="John" label={"First Name"} />
        <Inputbox onChange={(e)=>{
            setLastName(e.target.value);
        }} placeholder="Doe" label={"Last Name"} />
        <Inputbox onChange={(e)=>{
            setEmail(e.target.value);
        }} placeholder="mitanshu@gmail.com" label={"Email"} />
        <Inputbox onChange={(e)=>{
            setPassword(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">

          <Button onClick={async()=>{
                const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    username: email,
                    firstName,
                    lastName,
                    password
                });
                localStorage.setItem('token', response.data.token); 
                localStorage.setItem('username',email);
          }} label={"Sign up"} />

        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}