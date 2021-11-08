import React from 'react';
require('../allCss/login.css');
import key from '../images/key.svg'
import login from '../images/login.svg'
import edit from '../images/edit.svg'
import { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'


export default function Resetpass() {
    const [password, setpassword] = useState('');
    const [confirm, setconfirm] = useState('');
    const url =  window.location.href;
    const token =  url.split('/')[4];

    // console.log(url)
    // console.log(token)


    const clickHandler = async function (e) {
        
        e.preventDefault()


        if (password === confirm && password !== '' && confirm!== '') {

            const config = {
                'Content-Type':'application/json'
            }

            const data = await axios.put(`/user/resetpassword/${token}`,{password},config)
            console.log(data)

            if(data.data.error !==''){
                alert(data.data.error);
                setpassword('');
                setconfirm('');
            }



        }
        else {
            alert('error')
        }

    }


    return (
        <div>
            <form className='form ' action="" method='post'>

                <div className='reset' >
                    <div >
                        <label htmlFor="newpass">New Pass</label><br/>
                        <img src={key} alt="" /><input type="password" onChange={(e)=>{setpassword(e.target.value)}} value={password} name="password" id="newpass" />
                    </div>
                    <div>
                        <label htmlFor="confirmpass">Confirm</label><br/>
                        <img src={key} alt="" /><input type="text" onChange={(e)=>{setconfirm(e.target.value)}} value={confirm} name="confirmpassword" id="confirmpass" />

                    </div>
                    <button type="submit" onClick={(e) => { clickHandler(e) }} value="Change" > <img src={edit} alt="" /> Change</button>
                   <Link to= '/login'> <button >Login <img src={login} alt="" /></button></Link>

                </div>


            </form>
        </div>
    )
}
