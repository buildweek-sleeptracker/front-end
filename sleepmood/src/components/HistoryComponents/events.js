const now = new Date()

export default [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2019, 7, 0),
    end: new Date(2019, 7, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2019, 7, 7),
    end: new Date(2019, 7, 11),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2019, 7, 13),
    end: new Date(2019, 7, 20),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2019, 7, 20),
    end: new Date(2019, 7, 20),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2019, 3, 9, 0, 0, 0),
    end: new Date(2019, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2019, 8, 11),
    end: new Date(2019, 8, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2019, 7, 2),
    end: new Date(2019, 7, 2),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2019, 7, 12, 12),
    end: new Date(2019, 7, 12, 12),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2019, 8, 12, 14, 0, 0, 0),
    end: new Date(2019, 8, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2019, 8, 12, 17, 0, 0, 0),
    end: new Date(2019, 8, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2019, 8, 12, 20, 0, 0, 0),
    end: new Date(2019, 8, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2019, 8, 13, 7, 0, 0),
    end: new Date(2019, 8, 13, 10, 30, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2019, 8, 17, 19, 30, 0),
    end: new Date(2019, 8, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: 'Late Same Night Event',
    start: new Date(2019, 8, 17, 19, 30, 0),
    end: new Date(2019, 8, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2019, 8, 20, 19, 30, 0),
    end: new Date(2019, 8, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: 'Point in Time Event',
    start: now,
    end: now,
  },
]