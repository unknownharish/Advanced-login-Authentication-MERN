import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';

export default function privateScreen({ history }) {

    useEffect(() => {


        const fetchdata = async () => {



            const config = {
                headers: {
                    'Content-Types': 'application/json',
                    'Authorization': localStorage.getItem('authtoken')
                }
            }
            try {

                const data = await axios.post('/login/private', config);
                console.log(data)

            } catch (error) {


                localStorage.removeItem('authtoken');

                console.log(error);
                history.push('/login');


            }
        }


        fetchdata();

    }, [history]);

    const logouthandler = () => {

        localStorage.removeItem('authtoken');
        history.push('/login');

    }

    return (
        <div>
            <h1>Welcome to private Screen </h1>
            <p>your's welcome </p><br />
            <button onClick={logouthandler}>logout</button>
        </div>
    )
}
