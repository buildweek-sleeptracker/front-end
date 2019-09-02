import { updateExpression } from "@babel/types";

export const getRecommendedHoursOfSleep = (data) => {

  let storage = {};
  data.forEach(item => {
    let md = [item.sleepdate[1], item.sleepdate[2]].join(' ');
    let year = [item.sleepdate[0]].toString();
    let time = [item.sleepdate[3], item.sleepdate[4]].join(':');
    let start = new Date(md + ', ' + year + ' ' + time);

    let md2 = [item.wakedate[1], item.wakedate[2]].join(' ');
    let year2 = [item.wakedate[0]].toString();
    let time2 = [item.wakedate[3], item.wakedate[4]].join(':');
    let finish = new Date(md2 + ', ' + year2 + ' ' + time2);

    let hours = getHours(start, finish);
    if (storage[hours]) {
      storage[hours].push(Math.round((item.sleepmood + item.wakemood + item.daymood) / 3));
    } else {
      storage[hours] = [Math.round((item.sleepmood + item.wakemood + item.daymood) / 3)];
    }
  })

  let max = [0, 0];
  for (let key in storage) {
    if (storage[key].length > 1) {
      let avg = storage[key].reduce((acc, val) => {return acc += val}, 0) / storage[key].length;
      console.log('AVG', avg, 'Hour', key)
      if (avg > max[0]) {
        max[0] = avg;
        max[1] = key;
      }
    }
  }
  return max[1]
}

export const sortData = (data) => {
  const storage = {};

  //sort data by year and months
  data.forEach(date => {
    if (storage[date.wakedate[0]]) {
      if (storage[date.wakedate[0]][date.wakedate[1]]) {
        storage[date.wakedate[0]][date.wakedate[1]].push(date);
      } else {
        storage[date.wakedate[0]][date.wakedate[1]] = [date];
      }
    } else {
      storage[date.wakedate[0]] = {};
      storage[date.wakedate[0]][date.wakedate[1]] = [date];
    }
  });

  return storage;
}

export const sortDays = (sortedData) => {

  const daysInMonth = (month, year) => { 
    return new Date(year, month, 0).getDate(); 
  } 

  const addMissingDays = (month, monthArr, year) => {
    let numberOfDays = daysInMonth(month, year);
    let daysArr = [];
    for (let i = 1; i <= numberOfDays; i++) {
      daysArr.push(i);
    }
    console.log('DAYS ARR', daysArr, 'arr', monthArr)
    let updatedMonthArr = [];
    daysArr.forEach(item => {
      console.log('ITEM', item)
      if (monthArr.length > 0) {
        if (item === monthArr[0].wakedate[2]) {
          updatedMonthArr.push(monthArr[0]);
          monthArr.shift();
          console.log('IF', 'item: ', item, 'arr', updatedMonthArr)
        } else {
          updatedMonthArr.push({day: item, month: month, year: year});
          console.log('ELSE', updatedMonthArr)
        }
      } else {
        updatedMonthArr.push({day: item, month: month, year: year})
      }
    })
    console.log('add missing days func', updatedMonthArr)
    return updatedMonthArr;
  }

  for (let year in sortedData) {
    for (let month in sortedData[year]) {
      let sortedMonthArr = sortedData[year][month].sort((a, b) => a.wakedate[2] > b.wakedate[2] ? 1 : -1);
      let updatedMonthArr = addMissingDays(month, sortedMonthArr, year);
      console.log('updated month arr', updatedMonthArr, 'sorted arr', sortedMonthArr)
      sortedData[year][month] = updatedMonthArr;
    }
  }
  return sortedData;
}

export const getTheMostRecentWeek = (sortedData) => {
  let recentYear = 0;

  for (let year in sortedData) {
    if (year > recentYear) {
      recentYear = year;
    }
  }
  let recentMonth = 0;
  for (let month in sortedData[recentYear]) {
    if (month > recentMonth) {

      recentMonth = month;
    }
  }
  let week = [];
  //join two most recent months
  let twoRecentMonths = [];
  const daysInMonth = (month, year) => { 
    return new Date(year, month, 0).getDate(); 
  } 
  if (sortedData[recentYear][recentMonth - 1]) {
    twoRecentMonths = sortedData[recentYear][recentMonth - 1];
    twoRecentMonths = twoRecentMonths.concat(sortedData[recentYear][recentMonth]);
  } else {
    if (recentMonth !== 1) {
      let prevMonth = recentMonth - 1;
      let days = daysInMonth(prevMonth, recentYear);
      let mArr = [];
      for (let i = 1; i <= days; i++) {
        mArr.push({day: i, month: prevMonth, year: recentYear})
      }
      twoRecentMonths = mArr;
      twoRecentMonths = twoRecentMonths.concat(sortedData[recentYear][recentMonth]);
    } else {
      let prevM = 12;
      let d = daysInMonth(prevM, recentYear-1);
      let mA = [];
      for (let i = 1; i <= d; i++) {
        mA.push({day: i, month: prevM, year: recentYear-1})
      }
      twoRecentMonths = mA;
      twoRecentMonths = twoRecentMonths.concat(sortedData[recentYear][recentMonth]);
    }
  }

  for (let i = twoRecentMonths.length - 1; i >= 0; i--) {
    if (twoRecentMonths[i].id) {
      if (twoRecentMonths[i-6]) {
        if (i !== twoRecentMonths.length - 1) {
         week = twoRecentMonths.slice(i-6, i+1);
        } else {
          week = twoRecentMonths.slice(i-6);
        }
        i = -1;
      } else {
        if (i !== twoRecentMonths.length - 1) {
          week = twoRecentMonths.slice(0, i+1);
        } else {
          week = twoRecentMonths.slice(0);
        }
      }
    }
  }
  return week;
}

export const getGraphData = (data, setStartDate, setEndDate, 
                            setLongestSleep, setShortestSleep, 
                             setAverageSleep, setAverageMood, setMonthArray) => {

  let hoursArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let obj = {};
  let userHours = [];
  let moods = [];
  let monthArr = [];

  let graphData = data.map((item, index) => {

    if (item.id) {
      let md = [item.sleepdate[1], item.sleepdate[2]].join(' ');
      let year = [item.sleepdate[0]].toString();
      let time = [item.sleepdate[3], item.sleepdate[4]].join(':');
      let start = new Date(md + ', ' + year + ' ' + time);

      let md2 = [item.wakedate[1], item.wakedate[2]].join(' ');
      let year2 = [item.wakedate[0]].toString();
      let time2 = [item.wakedate[3], item.wakedate[4]].join(':');
      let finish = new Date(md2 + ', ' + year2 + ' ' + time2);

      monthArr.push(finish.getMonth() + 1);
    

      if (index === 0) {
        setStartDate((finish.getMonth() + 1) + '/' + finish.getDate());
      }

      if (index === data.length - 1) {
        setEndDate((finish.getMonth() + 1) + '/' + finish.getDate());
      }

      let hours = getHours(start, finish);
      userHours.push(hours);
      let moodAvr = (item.sleepmood + item.wakemood + item.daymood) / 3;
      moods.push(moodAvr);

      if (!obj[hours]) {
        obj[hours] = 0;
      } 
      return {x: item.wakedate[2], y: hours}
    } else {
      if (index === 0) {
        setStartDate(item.month + '/' + item.day);
      }

      if (index === data.length - 1) {
        setEndDate(item.month + '/' + item.day);
      }
      monthArr.push(item.month);
      return {x: item.day, y: 0}
    }
  })
  console.log('DEBUGGER GRAPARR', graphData)
  //collect months to display on xAxis before the date
  setMonthArray(monthArr);

  // hoursArr.forEach(num => {
  //   if (!obj[num]) {
  //     graphData.push({y: num})
  //   }
  // })

  let sortedUserHours = userHours.sort((a, b) => a - b);
  let avrSleep = Math.round(userHours.reduce((acc, val) => {return acc += val}, 0) / userHours.length);
  let avgWeekMood = Math.round(moods.reduce((acc, val) => {return acc += val}, 0) / moods.length);

  setLongestSleep(sortedUserHours[userHours.length - 1]);
  setShortestSleep(sortedUserHours[0]);
  setAverageSleep(avrSleep);
  setAverageMood(avgWeekMood);

  return graphData;
}

const getHours = (start, finish) => {
  let diff = (finish.getTime() - start.getTime()) / 1000;
  diff /= (60 * 60);
  if (diff > 12) {diff = 12}
  return Math.abs(Math.round(diff));
}

export {getHours};

export const makeDateFromArray = (arr) => {
  const newArr = [...arr];
  newArr[1]--;
  return new Date(...newArr);
}

export const makeFinishedDiv = (str) => {
  /*
    Here I'm creating three elements:
    A div to make the page darker/kinda "greyed out"
    A div to hold the text body
    The actual text
    I'm appending it to the body, then returning the three elements as an array.

    WHENEVER you use this function, make sure to remove the three elements from the body:
        array.forEach(elem => body.remove(elem))    
  */

  // Finding the body
  const body = document.querySelector("div.App");
  // body.style.overflow = "hidden";
  
  // Creating the divCover
  const divCover = document.createElement("div")
  divCover.style.position = "fixed";
  divCover.style.marginTop = `-30px`;
  divCover.style.height = "100vh";
  divCover.style.width = "100vw";
  divCover.style.background = "rgba(0, 0, 0, 0.6)";
  divCover.style.overflow = "hidden";
  divCover.style.zIndex = "9";

  // Creating the div and h3 for the text box
  const eish = document.createElement("h2")
  eish.innerText = str
  eish.style.color = "white";

  const divCheck = document.createElement("div");
  divCheck.append(eish);
  divCheck.style.background = "#191D37";
  divCheck.style.borderRadius = "5px"
  divCheck.style.padding = "1rem";
  divCheck.style.position = "fixed";
  divCheck.style.top = "50%";
  divCheck.style.zIndex = "10";
  divCheck.style.left = "50%";
  body.prepend(divCover);
  divCover.prepend(divCheck);
  divCheck.style.marginTop = `-${divCheck.offsetHeight/2}px`;
  divCheck.style.marginLeft = `-${divCheck.offsetWidth/2}px`;

  return [body, divCover]
}

export const wait = s => {
  return new Promise(res => {
    setTimeout(() => {
      console.log("next thing!");
      res();
    }, s*1000)
  })
}

