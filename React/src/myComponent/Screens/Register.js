import axios from 'axios';
import React from 'react'
import name from '../images/user.svg'
import mail from '../images/email.svg'
import key from '../images/key.svg'
import add from '../images/plus.svg'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom';

export default function Register({history}) {

    const [err,seterr] = useState('');
    const [username,setusername] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [confirmpassword,setconfirmpassword] = useState('');

    useEffect(()=>{

        localStorage.getItem('authtoken') && history.push('/')

    },[history])

    const submithandler = async function(e){

        e.preventDefault();
        if(password !== confirmpassword){
            seterr('invalid passwordwords not match');
            setpassword('')
            setconfirmpassword('')
            setTimeout(() => {
                seterr('')
            }, 5000);
        }

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }

        try {
            
            const data = await axios.post('/user/register',{username,email,password},config);
            console.log(data.data);

            localStorage.setItem('authtoken',data.data.token);
            history.push('/');
        } catch (error) {

            seterr(error);
            setTimeout(() => {
                seterr('');
                setpassword('');
                setconfirmpassword('');

                
            }, 1000);
            
            
        }

    }

    return (
        <div>
            <div class="container register" >
                {err!=='' && confirm(err)}
            <form method="post" >
                <div class="mx-3 my-3 col-5 input r1">
                    <label htmlfor="exampleInputEmail1" class=" form-label"><img src={mail}/> </label>
                    <input required type="email" name='email' value={email} onChange ={(e)=>{setemail(e.target.value)}} class="form-control" id="exampleInputEmail1" placeholder="Enter email"
                        aria-describedby="emailHelp"/>
                </div>
                <div class="mx-3 my-3 col-5 input r1">
                    <label htmlfor="username" class="form-label"><img src={name}/> </label>
                    <input required type="text" name='username'  value={username} onChange ={(e)=>{setusername(e.target.value)}}  class="form-control" id="username" placeholder="Username"
                        aria-describedby="emailHelp"/>
                </div>
                <div class="mx-3  my-3 col-5 input r1  pass">
                    <label htmlfor="exampleInputPasswordword1" class="form-label"><img style={{marginRight:'10px',marginLeft:'13px'}} src={key}/></label>
                    <input required type="password" name="password"  value={password} onChange ={(e)=>{setpassword(e.target.value)}} class="form-control" id="exampleInputPasswordword1"/>
                </div>
                <div class="mx-3  my-3 col-5 input r1">
                    <label htmlfor="confirmpassword" class="form-label"><img style={{marginRight:'6px'}} src={key}/></label>
                    <input required type="password" name="confirmPassword"  value={confirmpassword} onChange ={(e)=>{setconfirmpassword(e.target.value)}} class="form-control" id="confirmpassword"/>
                </div>

                <button type="submit" onClick={(e)=>{submithandler(e);}} class="btn btn-success my-3 mx-2">register</button>
                <Link to="login"><button type="button" class="btn btn-primary">have an account..?</button></Link>
            </form>
        </div>
        </div>
    )
}
