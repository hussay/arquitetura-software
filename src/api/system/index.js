import axios from "axios";

// export const getTodos = (routeParams) => {
//   return async (dispatch) => {
//     await axios
//       .get("api/system", {
//         params: routeParams,
//       })
//       .then((result) => {
//         dispatch({
//           type: "GET_TODOS",
//           todos: result.data,
//           routeParams,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };

export async function getSystem() {
  const servidores = await axios.get("api/system");
  // console.log(servidores);
  return servidores.data;
}

export const searchTask = (val) => {
  return (dispatch) => {
    dispatch({
      type: "SEARCH_TASK",
      val,
    });
  };
};
