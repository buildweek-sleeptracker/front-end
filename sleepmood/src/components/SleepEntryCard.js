import React from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { makeDateFromArray, getHours, makeFinishedDiv, wait } from '../helpers';
import { CircularProgressbar, buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinStars, faSmile, faMeh, faSadTear } from '@fortawesome/free-solid-svg-icons';
import 'react-circular-progressbar/dist/styles.css';

const CircleWrap = styled.div`
  width: 30%; 
  margin: 40px auto;
`;

const Total = styled.p`
  position: relative;
  right: 4rem;
  text-align:center;
  font-size: 24px;
  font-weight: 600;
  white-space:nowrap;
  color: #d0c9b4
`;

const Average = styled.p`
  position: relative;
  right: 2.5rem;
  text-align:center;
  font-size: 24px;
  font-weight: 600;
  white-space:nowrap;
  color: #d0c9b4
`;


const SleepEntryCard = ({entry, toHome}) => {
// Boom Awesome!!

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  if (!entry.sleepdate) {
    return <div />
  }
  console.log('Card', entry.sleepdate[3])
  const sleepDate = makeDateFromArray(entry.sleepdate);
  const wakeDate = makeDateFromArray(entry.wakedate);
  const totalHoursSlept = getHours(sleepDate, wakeDate);
  console.log("Total Hours\n", totalHoursSlept)

  const sleep = {
    year: entry.sleepdate[0],
    month: monthNames[entry.sleepdate[1] - 1],
    day: entry.sleepdate[2],
    hour: `${entry.sleepdate[3]}`.length === 1 ? `0${entry.sleepdate[3]}` : entry.sleepdate[3],
    minute: `${entry.sleepdate[4]}`.length === 1 ? `0${entry.sleepdate[4]}` : entry.sleepdate[4],
  }
  const wake = {
    year: entry.wakedate[0],
    month: monthNames[entry.wakedate[1] - 1],
    day: entry.wakedate[2],
    hour: `${entry.wakedate[3]}`.length === 1 ? `0${entry.wakedate[3]}` : entry.wakedate[3],
    minute: `${entry.wakedate[4]}`.length === 1 ? `0${entry.wakedate[4]}` : entry.wakedate[4]
  }

  const emojis = [faSadTear, faMeh, faSmile, faGrinStars];
  const averageMood = Math.round((entry.sleepmood + entry.wakemood + entry.daymood) / 3);


  

  function toDelete(e) {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/sleep/delete/${entry.id}`)
      .then(res => {
        const arr = makeFinishedDiv("The Sleep Entry\nhas been deleted.")
        wait(2).then(() => arr[1].remove())
        wait(1.5).then(() => toHome())
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="SleepEntryCard">
      <h1 className="card-title">{sleep.month} {sleep.day}, {sleep.year} - {wake.month} {wake.day}, {wake.year}</h1>
      <div className="bed-and-sleep">
        <div className="top-container" >
          <div className="titles">
            <h2 className='card-margin'>Bedtime:</h2>
            <h2 className='card-margin'>Waketime:</h2>
            <h2 className='card-margin'>Overall mood:</h2>
          </div>
          <div className="times">
            <h2 className='card-margin'>{sleep.hour}:{sleep.minute}</h2>
            <h2 className='card-margin'>{wake.hour}:{wake.minute}</h2>
            <h2 className='card-margin'>{""}</h2>
          </div>
          <div className="emojis">
            <h4 className='card-margin'>
              <FontAwesomeIcon style={{ color: '#AEA37E', width: '30px', height: '30px' }} icon={emojis[entry.sleepmood - 1]} />
            </h4>
            <h4 className='card-margin'>
              <FontAwesomeIcon style={{ color: '#AEA37E', width: '30px', height: '30px' }} icon={emojis[entry.wakemood - 1]} />
            </h4>
            <h4 className='card-margin'>
              <FontAwesomeIcon style={{ color: '#AEA37E', width: '30px', height: '30px' }} icon={emojis[entry.daymood - 1]} />
            </h4></div>
        </div>

        <div className='circle-container'>
          <CircleWrap>
            <Total>Total hours asleep</Total>
            <div style={{ background: '#F4F4F6', borderRadius: '50%' }}>
              <CircularProgressbar
                styles={buildStyles({
                  textSize: '25px',
                  textColor: '#191D37',
                  pathColor: '#93875C',
                  trailColor: '#F4F4F6'
                })}
                value={totalHoursSlept} text={totalHoursSlept} maxValue={4}
              />
            </div>
          </CircleWrap>
          <CircleWrap>
            <Average>Average Mood</Average>
            <div style={{ background: '#F4F4F6', borderRadius: '50%' }}>
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

        </div>

        <div>
        </div>
      <div className="button-container">
        <Link to={`/CreateSleepEntry/update/${entry.id}`} className="card-links">
          <button type="button" className="card-edit" >Edit</button>
        </Link>
        <Link to={`/CreateSleepEntry/${entry.id}`} className="card-links">
          <button type="button" onClick={toDelete} className="card-delete" >Delete</button>
        </Link>
      </div>

      </div> {/* bed-and-sleep */}

    </div>

  );
};
export default SleepEntryCard;