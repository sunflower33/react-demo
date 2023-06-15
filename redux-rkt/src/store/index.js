import { configureStore, createSlice } from "@reduxjs/toolkit";

const stuSlice = createSlice({
  name: "stu", // 用来自动生成action中的type
  initialState: {
    name: "name",
    age: 2,
    gender: "男",
    address: "花果山",
  }, // 用于指定state的初始值
  reducers: {
    // 用于指定state的各种操作，直接在对象中添加方法
    setName(state, action) {
      // 可以通过不同的方法来指定对state的不同操作
      // state：这是一个代理对象，可以直接修改
      state.name = "newName";
    },
    setAge(state, action) {},
  },
});

// 切片对象会自动生成action
// actions中存储的是slice自动生成action创建其（函数），调用函数会自动创建action对象
// action对象的结构{type:name/函数名, payload: 函数参数}
export const { setName, setAge } = stuSlice.actions;

// configureStore创建store对象，需要一个配置对象作为参数
const store = configureStore({
    reducer: {
        student: stuSlice.reducer
    }
})


export default store