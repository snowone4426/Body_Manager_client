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

// {

// start_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),

// end_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),

// },

// {

// start_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),

// end_time: undefined,

// },

// ])

}, [])

const attendanceHanlder = () => {

if (attendanceRecord.length >= 2 && !!attendanceRecord[1].end_time) {

alert('2회이상 입장할 수 없습니다')

return

}

axios

.post(

`${process.env.REACT_APP_SERVER_URL}/attend/register`,

{},

{

withCredentials: true,

},

)

.then((res) => {

if (res.data.message === 'ok') {

alert('처리되었습니다')

getAttendList()

return

}


})

.catch((err) => {

console.log(err)

alert('다시 시도해주세요')

})

}

return (

<AttendanceContainer>



<AttendanceBtn onClickFn={() => attendanceHanlder()}>

입장 / 퇴장

</AttendanceBtn>


<RecordBox>

<RecordTitle>출석기록</RecordTitle>

<AttendanceRecord>

{attendanceRecord.map((el, idx) => (

<li key={idx}>

{'입장기록 : ' + el.start_time + ' 퇴장기록 : ' + (el.end_time ?? "")}

</li>

))}

</AttendanceRecord>

</RecordBox>

</AttendanceContainer>

)

}

const AttendanceContainer = styled.div`

padding: 2rem;

`

const RecordBox = styled.div``

const RecordTitle = styled.h1``

const AttendanceRecord = styled.ul``