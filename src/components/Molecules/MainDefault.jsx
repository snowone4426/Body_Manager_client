import styled from 'styled-components'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'

import { chartActions } from '../../store/chart'

export default function MainDefault() {
  const dispatch = useDispatch()
  const lineData = useSelector((state) => state.chart.lineData)
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/inbody/physical`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === 'ok') {
          dispatch(
            chartActions.changeData({
              dataType: 'lineData',
              dataValue: res.data.data,
            }),
          )
        }
      })
      .catch((err) => console.log(err))
  }, [dispatch])

  // const lineData = [
  //   {
  //     name: '2022-11-15',
  //     weight: 10,
  //     SMM: 4,
  //     BFM: 6,
  //   },
  //   {
  //     name: '2022-11-16',
  //     weight: 12,
  //     SMM: 4,
  //     BFM: 8,
  //   },
  //   {
  //     name: '2022-11-17',
  //     weight: 13,
  //     SMM: 5,
  //     BFM: 8,
  //   },
  //   {
  //     name: '2022-11-18',
  //     weight: 15,
  //     SMM: 6,
  //     BFM: 9,
  //   },
  //   {
  //     name: '2022-11-19',
  //     weight: 0,
  //     SMM: 0,
  //     BFM: 0,
  //   },
  //   {
  //     name: '2022-11-20',
  //     weight: 0,
  //     SMM: 0,
  //     BFM: 0,
  //   },
  //   {
  //     name: '2022-11-21',
  //     weight: 0,
  //     SMM: 0,
  //     BFM: 0,
  //   },
  //   {
  //     name: '2022-11-22',
  //     weight: 0,
  //     SMM: 0,
  //     BFM: 0,
  //   },
  //   {
  //     name: '2022-11-23',
  //     weight: 0,
  //     SMM: 0,
  //     BFM: 0,
  //   },
  //   {
  //     name: '2022-11-24',
  //     weight: 0,
  //     SMM: 0,
  //     BFM: 0,
  //   },
  // ]
  return (
    <MainDefaultContainer>
      <ResponsiveContainer width="90%" height="90%">
        <LineChart
          width={100}
          height={100}
          data={lineData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <Line type="monotone" dataKey="SMM" stroke="#82ca9d" />
          <Line type="monotone" dataKey="BFM" stroke="#ca8a82" />
        </LineChart>
      </ResponsiveContainer>
    </MainDefaultContainer>
  )
}

const MainDefaultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
