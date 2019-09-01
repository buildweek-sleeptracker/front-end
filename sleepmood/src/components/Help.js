import React from 'react';
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Help = () => {

  const HelpWrap = styled.div`
    color: #cfd2e8;
    height: 100vh;
    margin: 5%;
    button {
      background: #b07568;
      border-radius: 5px;
      border: none;
      color: white;
      font-weight: bold;
      padding: 8px 8px;
      text-align: center;
    }
  `;

  return (
    <HelpWrap>
      <h2>Getting started</h2>
      <Link to='/signup'><button><h3>Click here to make an account</h3></button></Link>

      <h2>Login</h2>
      <Link to='/login'><button><h3>Click here to login</h3></button></Link>

      <h2>Start by creating a sleep entry</h2>
      <Link to='/CreateSleepEntry'><button><h3>Click here to create sleep entry</h3></button></Link>

      <h2>Sleep entry history</h2>
      <Link to='/SleepHistory'><button><h3>Click here to see your sleep history</h3></button></Link>

      <h2>See your weekly graph</h2>
      <Link to='/SleepHistory'><button><h3>Click here to see your weekly graph</h3></button></Link>

    </HelpWrap>
  )
}

export default Help;