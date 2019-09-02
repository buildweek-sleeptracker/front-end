import React, { useState, useEffect } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import  { 
  VerticalBarSeries,
  XAxis,
  YAxis,
  XYPlot } from 'react-vis';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { getRecommendedHoursOfSleep, getGraphData, sortData, sortDays, getTheMostRecentWeek } from './../helpers.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinStars, faSmile, faMeh, faSadTear } from '@fortawesome/free-solid-svg-icons';

const CircleWrap = styled.div`
  width: 20%; 
  margin: 30px;
`

const RowWrap = styled.div`
  display: flex;
  justify-content: center;
`
const Text = styled.p`
  text-align: center; 
  font-size: 16px;
  font-weight: 600;
  white-space:nowrap;
  color: #EFE3E1
`

const WhiteSpace = styled.div`
  height: 30px; 
  width: 100%
`

const CalendarWrap = styled.div`
  display: flex; 
  justify-content: center
`

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Home = () => {
  const [xAxisValues, setXAxisValues] = useState([]);
  const [date, setDate] = useState(new Date());
  const [graphData, setGraphData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [longestSleep, setLongestSleep] = useState('');
  const [shortestSleep, setShortestSleep] = useState('');
  const [averageMood, setAverageMood] = useState('');
  const [averageSleep, setAverageSleep] = useState('');
  const [recommendedSleep, setRecommendedSleep] = useState('');
  const [monthArray, setMonthArray] = useState([]);
  const emojis = [faSadTear, faMeh, faSmile, faGrinStars];
  const [calendarChange, setCalendarChange] = useState(false);

  useEffect(() => {
    console.log('use effect')
    axiosWithAuth()
    .get('/sleep/all')
    .then(res => {
      let data = res.data;

      let sorted = sortData(data);
      //find the most recent year and most recent month
      let dataWithSortedDays = sortDays(sorted);

      //get the most recent week of data
      let week2 = getTheMostRecentWeek(dataWithSortedDays);
      console.log('DATA', data);
      console.log('SORTED DATA', sorted);
      console.log('SORTED DAYS', dataWithSortedDays)
      console.log('WEEK2', week2)

      let recommendedHours = getRecommendedHoursOfSleep(data);
      setRecommendedSleep(recommendedHours);

      let week = data.slice(data.length - 7);

      let xAxis = week2.map(item => {
        if (item.id) {
        return item.wakedate[2];
        } else {
          return item.day;
        }
      })
      setXAxisValues(xAxis);

      let graphData = getGraphData(week2, setStartDate, setEndDate, 
                                   setLongestSleep, setShortestSleep, 
                                   setAverageSleep, setAverageMood, setMonthArray);
      setGraphData(graphData);

    })
    .catch(err => {
      console.log('HERE Opps, Something happened!', err)
    }) 
  }, [calendarChange])

  const handleChange = (date) => {
    setCalendarChange(!calendarChange);
    setDate(date);
  }


  if (graphData.length === 0) {
    return <p>Loading</p>
  } else {

  return (
    <div style={{margin: '10px', display: 'flex', flexDirection: 'column'}}>
      <h3 style={{marginLeft: '30px', color: '#D0C9B4', marginTop: '20px', marginBottom: '30px'}}>Your sleep history for the week.</h3>
      <div>
        <XYPlot height={300} width={470} xType="ordinal">
          <XAxis tickValues={xAxisValues} tickFormat={v =>  
          { let m = monthArray[0];
            monthArray.shift();
            return  `${m.toString()} / ${v * 1}`}} style={{
            text: {stroke: 'none', fill: '#F5F4EF', fontWeight: 600}
          }}/>
          <YAxis tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} tickTotal={12} tickFormat={v => v * 1} style={{
            text: {stroke: 'none', fill: '#F5F4EF', fontWeight: 600}
          }}/>
          <VerticalBarSeries data={graphData} style={{fill: '#4A549C', stroke: '#93875C', strokeWidth: 2}} opacity={0.8}/>
        </XYPlot>
      </div>
      <p style={{color: '#EFE3E1', textAlign: 'center', fontSize: '16px', fontWeight: '600', marginTop: '15px'}}>Week of {monthNames[monthArray[0] - 1]} {startDate.split('/')[1]} to {monthNames[monthArray[monthArray.length - 1] - 1]} {endDate.split('/')[1]}</p>
      <h2 style={{textAlign: 'center', color: '#D0C9B4'}}>Sleep & Mood History for Week.</h2>
      <RowWrap>
        <CircleWrap>
          <Text>Longest Sleep</Text>
            <div style={{background: '#F4F4F6', borderRadius: '50%'}}>
            <CircularProgressbar 
            styles={buildStyles({
              textSize: '25px',
              textColor: '#191D37',
              pathColor: '#93875C',
              trailColor: '#F4F4F6' 
            })}
            value={longestSleep} text={`${longestSleep}`} maxValue={12}/>
            </div>
        </CircleWrap>
        <CircleWrap>
          <Text>Shortest Sleep</Text>
          <div style={{background: '#F4F4F6', borderRadius: '50%'}}>
          <CircularProgressbar 
            styles={buildStyles({
              textSize: '25px',
              textColor: '#191D37',
              pathColor: '#93875C',
              trailColor: '#F4F4F6' 
            })}
            value={shortestSleep} text={`${shortestSleep}`} maxValue={12}/>
          </div>
        </CircleWrap>
      </RowWrap>
      <RowWrap>
        <CircleWrap>
          <Text>Average Mood</Text>
          <div style={{background: '#F4F4F6', borderRadius: '50%'}}>
          <CircularProgressbarWithChildren 
            styles={buildStyles({
              textSize: '25px',
              textColor: '#191D37',
              pathColor: '#93875C',
              trailColor: '#F4F4F6'
            })}
            value={averageMood} 
            maxValue={4}>
            <FontAwesomeIcon icon={emojis[averageMood - 1]} style={{color: '#AEA37E', width: '35px', height: '35px', margin: '5px'}}/>
            </CircularProgressbarWithChildren>
          </div>
        </CircleWrap>
        <CircleWrap>
          <Text>Average Sleep</Text>
          <div style={{background: '#F4F4F6', borderRadius: '50%'}}>
          <CircularProgressbar 
            styles={buildStyles({
              textSize: '25px',
              textColor: '#191D37',
              pathColor: '#93875C',
              trailColor: '#F4F4F6'
            })}
            value={averageSleep} text={`${averageSleep}`} maxValue={12}/>
          </div>
        </CircleWrap>
      </RowWrap>
      <RowWrap style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h2 style={{color: '#EFE3E1', marginBottom: '0', textAlign: 'center'}}>Recommended Hours<br/> of Sleep Over Time</h2>
        <CircleWrap>
          <div style={{background: '#F4F4F6', borderRadius: '50%'}}>
          <CircularProgressbar 
            styles={buildStyles({
              textSize: '25px',
              textColor: '#191D37',
              pathColor: '#93875C',  
              trailColor: '#F4F4F6'
            })}
            value={recommendedSleep} text={`${recommendedSleep}`} maxValue={12}/>
            </div>
        </CircleWrap>
      </RowWrap>
      <div>
        <h2 style={{textAlign: 'center', color: '#D0C9B4', marginTop: '20px', marginBottom: '30px'}}>See additional sleep history by week.</h2>
        <CalendarWrap style={{pointerEvents: 'none',borderRadius: '8px', border: '5px solid #B07568', width: '350px', margin: '0 auto'}}>
          <Calendar 
            //pointerEvents: 'none',
            onChange={handleChange}
            value={date}
          />
        </CalendarWrap>
        <WhiteSpace></WhiteSpace>
      </div>
    </div>

  )
 }
}

export default Home;

