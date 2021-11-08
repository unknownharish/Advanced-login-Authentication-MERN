import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import username from '../images/email.svg'
import log from '../images/login.svg'
import { Link } from 'react-router-dom';



export default function Forgotpass() {
    const [err, seterr] = useState('');
    const [email, setemail] = useState('');



    const submithandler = async function (e) {

        e.preventDefault();
        if (email === '') {
            seterr('enter your email...!');
            setTimeout(() => {
                seterr('')
            }, 3000);

        }
        const config = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        try {

            const data = await axios.post('/user/forgotpasswrd', { email }, config)
            console.log(data.data.error);

            if(!data.data.success){
                alert(data.data.error)
            }


        } catch (error) {
            console.log(error)
            seterr(error);
            
            setTimeout(() => {
                seterr('');

            }, 1000);
        }
    }


    return (
        <div>
            <div class="container forgot" >
                {err !== '' && confirm(err)}
                <form method="get" >
                    <div class="mx-3 my-3 col-5 input forget">
                        <label htmlfor="exampleInputEmail1" class="form-label"><img src={username}/></label>
                        <input type="email" name='email' value={email} onChange={(e) => { setemail(e.target.value) }} class="form-control" id="exampleInputEmail1" placeholder="Enter email"
                            aria-describedby="emailHelp" />
                    </div>



                    <button type="submit" onClick={(e) => { submithandler(e); }} class="btn btn-success my-3 mx-2">Get link</button>
                    <Link to='/login' id='link'>back to login...<img style={{height:'25px'}} src={log}/></Link>
                </form>
            </div>
        </div>
    )
}
