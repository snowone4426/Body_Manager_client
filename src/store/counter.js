import {createSlice} from "@reduxjs/toolkit"

const initialCounterState = {counter : 0, isOpen : true};

const counterSlice =  createSlice({
  name : 'counter', // 모든 slice는 식별자로서  이름이 있어야함.
  initialState : initialCounterState,
  reducers: {
    increment(state){state.counter++},
    decrement(state){state.counter--},
    mulitincrement(state,action){state.counter += action.payload}, // 툴킷을 사용하면 무조건 페이로드를 payload라는 변수로 받음
    isOpen(state){state.isOpen = !state.isOpen}
  }
})

export const counterActions = counterSlice.actions;
export default counterSlice.reducer