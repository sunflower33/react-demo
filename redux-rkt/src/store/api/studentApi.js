import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

console.log("createApi:", createApi);
// 创建Api对象
// createApi() 用来创建RTKQ中的API对象
// RTKQ的所有功能都需要通过该对象来进行
// createApi需要一个对象来作为参数
const studentApi = createApi({
  reducerPath: "studentApi", // API的命名空间
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: (build) => {
    return {
      getStudents: build.query({
        query() {
          return "/users";
        },
      }),
    };
  },
});

console.log(studentApi);

// Api对象创建后，对象中会根据各种方法自动生成对应的钩子函数
// 通过这些钩子函数，可以向服务器发送请求
// 钩子函数的命名规则 getStudens ---> useGetStudensQuery
export const { useGetStudentsQuery } = studentApi;

export default studentApi;
