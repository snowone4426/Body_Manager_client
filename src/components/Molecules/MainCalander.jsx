import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import moment from 'moment'
import 'moment/locale/ko'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { dateActions } from '../../store/date'
import { useLocation } from 'react-router-dom'

export default function MainCalander() {
  const dispatch = useDispatch()
  const location = useLocation()
  const pathname = location.pathname
  const mainDate = useSelector((state) => state.date.mainDate)

  const [value, setValue] = useState(new Date())
  const [PTListArr, setPTListArr] = useState([])
  const [attendObj, setAttendArr] = useState({})

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/ptprogram/listmonth`,
        {
          year: moment(mainDate).format('YYYY'),
          month: moment(mainDate).format('MM'),
        },
        { withCredentials: true },
      )
      .then((res) => setPTListArr(res.data.data))
      .catch((err) => console.log(err))

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/attend/readmonth`,
        {
          year: moment(mainDate).format('YYYY'),
          month: moment(mainDate).format('MM'),
        },
        { withCredentials: true },
      )
      .then((res) => setAttendArr(res.data.data))
      .catch((err) => console.log(err))

    // setPTListArr(['2022-11-01', '2022-11-02', '2022-11-03', '2022-11-30'])
    // setAttendArr({
    //   '2022-11-01': 1,
    //   '2022-11-23': 2,
    //   '2022-11-24': 1,
    // })
  }, [])

  // 주소가 바뀌면 달력의 선택 날짜를 오늘로 초기화
  useEffect(() => {
    dispatch(dateActions.pickMainDate(moment(new Date()).format('YYYY-MM-DD')))
    setValue(moment(new Date()).toDate())
  }, [pathname, dispatch])

  const datePickHanlder = (date) => {
    const formatDate = moment(date).format('YYYY-MM-DD')

    if (
      location.pathname.split('/')[2] !== 'exerciseplan' &&
      location.pathname.split('/')[2] !== 'diet'
    )
      return

    dispatch(dateActions.pickMainDate(formatDate))
    setValue(date)
  }

  const calendarMarkHanlder = ({ date, view }) => {
    const tag = []
    if (
      Object.keys(attendObj).includes(moment(date).format('YYYY-MM-DD')) &&
      attendObj[moment(date).format('YYYY-MM-DD')] === 1
    ) {
      tag.push(<AttendanceDot color="#58b69bbd" />)
    }
    if (
      Object.keys(attendObj).includes(moment(date).format('YYYY-MM-DD')) &&
      attendObj[moment(date).format('YYYY-MM-DD')] === 2
    ) {
      tag.push(<AttendanceDot color="#f09275b9" />)
    }
    if (PTListArr.includes(moment(date).format('YYYY-MM-DD'))) {
      tag.push(<PTDate />)
    }
    return tag
  }

  return (
    <CalendarContainer>
      <Calendar
        onChange={datePickHanlder}
        value={value}
        formatDay={(locale, date) => moment(date).format('DD')}
        showNeighboringMonth={false}
        minDetail="month"
        maxDetail="month"
        tileContent={calendarMarkHanlder}
      />
    </CalendarContainer>
  )
}

const CalendarContainer = styled.div`
  .react-calendar {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
    overflow: hidden;
    background-color: #f9f9f9;
    border-radius: 1rem;
    padding: 0.5rem;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
    border-radius: 0.5rem;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 3rem;
    margin-top: 0.5rem;
  }
  .react-calendar__navigation button {
    min-width: 2.5rem;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    color: inherit;
    /* background-color: #f0f0f0; */
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e6e6e6;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75rem;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    width: 0.7rem;
    height: 2.5rem;
    font-size: 1rem;
    /* font-weight: 600; */
    text-align: center;
    line-height: 16px;
    /* padding: 0.7rem 0.4rem; */
    background: none;
  }
  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  /* .react-calendar__tile:enabled:focus, */
  .react-calendar__tile:enabled:hover {
    background-color: #e6e6e6;
  }
  /* .react-calendar__tile--now {
    background: #ffff76;
  } */
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
  }
  .react-calendar__tile--hasActive {
    background: #76baff;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
  }
  .react-calendar__tile--active {
    background: #006edc;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
`

const AttendanceDot = styled.div`
  position: absolute;
  width: 1.1rem;
  height: 0.3rem;
  border-radius: 0.4rem;
  background-color: ${({ color }) => color};
  transform: translate(0.96rem, 0.25rem);
`

const PTDate = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
  background-color: blue;
  transform: translate(0.75rem, -1.25rem);
  opacity: 0.2;
`
