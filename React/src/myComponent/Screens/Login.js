import React from 'react'
import username from '../images/email.svg'
import key from '../images/key.svg'
import add from '../images/person-plus.svg'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
require('../allCss/login.css')

export default function Login({ history }) {


    const [err, seterr] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    useEffect(() => {

        localStorage.getItem('authtoken') && history.push('/')

    }, [history])

    const submithandler = async function (e) {

        e.preventDefault();
        if (email === '' || password === '') {
            alert(`can't left field empty`)

        }
        else {



            if (err === '') {

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                let data;
                try {
                    data = await axios.post('/user/login', { email, password }, config);
                    console.log(data.data);

                    if (data.data.success) {

                        localStorage.setItem('authtoken', data.data.token);
                        history.push('/');
                    }
                    else {

                        history.push('/login');
                    }



                } catch (error) {
                    seterr(error);
                    console.log(data.data.error)
                    setpassword('');
                    setTimeout(() => {
                        seterr('');
                    }, 1000);
                }
            }
            else {

                alert('invalid details')
            }

        }



    }


    return (

        <div>
            <div class="container login" >
                {err !== '' && confirm(err)}
                <form method="post" >

                    <div class="input one ">
                        <label htmlfor="username" class="form-label"><img className='img' src={username} alt="" /> </label>
                        <input type="email" name='username' value={email} onChange={(e) => { setemail(e.target.value) }} class="form-control" id="username" placeholder="Username"
                            aria-describedby="emailHelp" />
                    </div>
                    <div class="two input">
                        <label htmlfor="exampleInputPassword1" class="form-label"><img  className='img' src={key} alt="" /></label>
                        <input type="password" name="password" value={password} onChange={(e) => { setpassword(e.target.value) }} class="form-control" id="exampleInputPassword1" />
                    </div>


                    <button type="submit" onClick={(e) => { submithandler(e); }} class="btn btn-success my-3 mx-2">Login</button>
                    <Link to='forgotpassword' >  <button type="button" class="btn btn-primary">Forgot Password</button></Link>

                    <div className="aside" style={{ display: 'flex' }}>

                        <Link to='register' ><a type="button" class="btn btn-primary"><img style={{marginRight:'7px'}} src={add}/>New user..?</a></Link>
                    </div>
                </form>
            </div>
        </div>


    )
}
