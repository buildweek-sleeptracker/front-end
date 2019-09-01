import React from 'react';
import styled from 'styled-components';import BigCalendar from './BigCalander';

import 'react-big-calendar/lib/css/react-big-calendar.css';//Gives access to
import './history.scss';

const CalenderContainer = styled.div`
    border-radius:5px;
    color: white;
    margin: 30px auto;
    padding: 0px 10px;
`;

const Title = styled.h1`
    color: #edebe3;
    font-family: 'Bitter', serif;
    font-size: 24px;
    padding: 40px 0 10px;
    text-align: center;
`;

const ButtonContainer = styled.div`
    text-align: center;
    width: 460px;
    margin: 0px auto;
    button{
      margin-top: 60px ;
      background: #C1b89c;
        border-radius: 5px;
        border: none;
        color: #191D37;
        font-weight: bold;
        padding: 8px 5px;
        text-align: center;
        width: 140px;
    }
`;


const SleepHistory = (props) => {

  const toSleepEntry = e => {
    console.log(e)
    props.history.push(`/SleepEntryList/${e.id}`)
  }


  return (
    <div className='sleep-history'>
      <Title>Sleep History By Month</Title>
      <CalenderContainer>
        <BigCalendar clicked={toSleepEntry} />
      </CalenderContainer>
      
      <ButtonContainer>
        <button>Back</button>
      </ButtonContainer>

    </div>
  )
}

export default SleepHistory;