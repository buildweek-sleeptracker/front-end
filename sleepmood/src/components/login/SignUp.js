import React, { useState } from 'react';
import axios from 'axios';
import { axiosLoginAuth } from '../../utils/axiosWithAuth';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Warning from './Warning';
import './signup.css';


const SignUp = (props) => {

  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' })

  const handleConfirm = () => {
    const { password, confirmpassword } = user;
    // perform all neccessary validations
    if (password !== confirmpassword) {
      return
    }
  }

  const inputChangeHandler = event => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value })
    console.log(
      "handleChange",
      event.target.name,
      event.target.value,
    );
  }

  const handleSubmit = event => {
    event.preventDefault();

    axios.post("https://sleep-mood-db.herokuapp.com/createnewuser", user)
      .then(res => {
        if (res.status === 201) {
          axiosLoginAuth()
            .post('/login', `grant_type=password&username=${user.email}&password=${user.password}`)
            .then(res => {
              localStorage.setItem("token", res.data["access_token"]);
              localStorage.setItem("tokenType", res.data["token_type"]);
              props.history.push('/home');
              console.log('Successful Login', res.data)
            })
            .catch(err => {
              console.log('Opps, Something happened!', err.response)
            })
        }
        console.log('Successful Login', res.data)
      })
      .catch(err => {
        console.log('Opps, Something happened!', err.response)
      })
    setUser({
      firstname: "", lastname: "", email: "", password: ""
    })
  }

  const QuoteBlock = styled.div`
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
    align-items: flex-end;
    flex-direction: column;
    height: 50px;
    .landing-cloud1 {
        color:#B5B7c5;
        font-size: 6rem;
        position: relative;
        top: -4rem;
        right: 4rem;
    }
    .landing-cloud2 {
        color:#B5B7c5;
        font-size: 4rem;
        position: relative;
        top: -1rem;
        right: 9rem;
    }
`;

  const Button = styled.button`
    color: #191d37;
    width: 100%;
    background: #b07568;
    color: #231f14;
    border-radius: 5px;
    font-weight: bold;
 `

  const Header = styled.h2`
   text-align: center;
   color: white;
   font-family: 'Bitter', serif;
   font-size:28px;
   margin: 40px 0 30px;
 `

  return (
    <div className="sign-up">
      <QuoteBlock>
        <p className="quote">"Never waste any time you can spend sleeping."</p>
        <p>-F. Knight</p>
      </QuoteBlock>
      <IconContainer>
        <Icon name="cloud" className='landing-cloud1' />
        <Icon name="cloud" className='landing-cloud2' />
      </IconContainer>
      <Header>Create your account.</Header>
      <form onSubmit={handleSubmit} className="pure-form pure-form-stacked">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              name="firstname"
              value={user.firstname}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="lastname">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={inputChangeHandler}
            />
          </div>

          <div className="pure-control-group">
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={user.confirmpassword}
              onChange={inputChangeHandler}
            />
          </div>
          <Button type="submit" className="pure-button pure-button-primary">Create Account</Button>
        </fieldset>
      </form>
      <p className="login-link">Already have an account? <Link to="/login">Sign In</Link></p>
    </div>
  )
}

export default SignUp;