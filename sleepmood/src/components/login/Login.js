import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { axiosLoginAuth } from '../../utils/axiosWithAuth'
import './Login.css';


function Login(props) {
    const [user, setUser] = useState({ username: '', password: '' })

    const inputChangeHandler = event => {
        setUser({ ...user, [event.target.name]: event.target.value })
        event.target.focus()
    }

    const handleSubmit = event => {
        event.preventDefault();
        console.log(user);

        //This is the post request that allows connection to backend
        axiosLoginAuth()
            .post('/login', `grant_type=password&username=${user.username}&password=${user.password}`)
            .then(res => {
                localStorage.setItem("token", res.data["access_token"]);
                localStorage.setItem("tokenType", res.data["token_type"]);
                props.history.push('/home');
                console.log('Successful Login', res)
            })
            .catch(err => {
                console.log('Oops, Something happened!', err.response)
            })
        setUser({
            username: '',
            password: ''
        })
    }

    const QuoteBlock = styled.div`
        display: flex;
        justify-content: flex-end;
        margin: 15px 40px 10px;
        padding-top: 40px;

    .quote{
      color: #edebe3;
      font-family: 'Bitter', serif;
      font-size: 24px;
      line-height: 40px;
    }

    p{
      color: #edebe3;
      font-family: 'Bitter', serif;
      font-size: 24px;
    }
  `;

    const IconContainer = styled.div`
        color: #979ECD;
        display: flex;
        align-content: flex-start;
        flex-direction: column;
        height: 50px;
    .landing-cloud1 {
        color:#B5B7c5;
        font-size: 6rem;
        position: relative;
        top: -5rem;
        left: 4rem;
    }
    .landing-cloud2 {
        color:#B5B7c5;
        font-size: 4rem;
        position: relative;
        top: -2rem;
        left: 9rem;
    }
`;

    const Header = styled.h2`
        text-align: center;
        color: white;
        font-family: 'Bitter', serif;
        font-size:28px;
        margin: 40px 0 30px;
    `


    const Button = styled.button`
        width: 100%;
        background: #d0c9b4;
        color: #232432;
        border-radius: 5px;
        font-weight: bold;
 `;
    

    return (
        <div className="login-page">
            <div>
                <QuoteBlock>
                    <p className="quote">Good evening, <br></br> welcome back.</p>
                </QuoteBlock>
                <IconContainer>
                    <Icon name="cloud" className='landing-cloud1' />
                    <Icon name="cloud" className='landing-cloud2' />
                </IconContainer>
            </div>

            <Header>Sign in to sleepmood</Header>
            <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
                <fieldset>
                    <label htmlFor="email">Email</label>
                    <input
                        style={{ marginBottom: "15px" }}
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={inputChangeHandler}
                        value={user.username}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        style={{ marginBottom: "15px" }}
                        className="input-class"
                        type="password"
                        name="password"
                        onChange={inputChangeHandler}
                        value={user.password}
                    />
                    <Button
                        type="submit"
                        className="pure-button pure-button-primary">
                        Sign in
                    </Button>
                </fieldset>
            </form>
            <p style={{ textAlign: "center", color: "white" }}>First time user? <Link to="/signup">Register.</Link></p>
        </div>
    )
}



export default Login;