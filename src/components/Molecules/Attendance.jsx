import { useEffect, useState } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { AttendanceBtn } from '..'
import axios from 'axios'

export default function Attendance() {
  const [attendanceRecord, setAttendanceRecord] = useState([])

  const getAttendList = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/attend/readDay`,
        {},
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          setAttendanceRecord(res.data.data)
        }
      })
  }

  useEffect(() => {
    getAttendList()
    // setAttendanceRecord([
    //   {
    //     start_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    //     end_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    //   },
    //   {
    //     start_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    //     end_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    //   },
    // ])
  }, [])

  const attendanceHanlder = (type) => {
    if (attendanceRecord.length === 2 && attendanceRecord[1].end_time !== '') {
      alert('2회이상 입장할 수 없습니다')
      return
    }
    // alert(type + '시도')
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/attend/register?pt=${
          type === 'pt'
        }`,
        { withCredentials: true },
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          getAttendList()
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <AttendanceContainer>
      <AttendanceBtn onClickFn={() => attendanceHanlder('common')}>
        asd
      </AttendanceBtn>
      <AttendanceBtn onClickFn={() => attendanceHanlder('pt')}>
        zxc
      </AttendanceBtn>
      <RecordBox>
        <RecordTitle>출석기록</RecordTitle>
        <AttendanceRecord>
          {attendanceRecord.map((el, idx) => (
            <li key={idx}>
              {'입장기록 : ' + el.start_time + ' 퇴장기록 : ' + el.end_time}
            </li>
          ))}
        </AttendanceRecord>
      </RecordBox>
    </AttendanceContainer>
  )
}

const AttendanceContainer = styled.div``

const RecordBox = styled.div``

const RecordTitle = styled.h1``

const AttendanceRecord = styled.ul``
