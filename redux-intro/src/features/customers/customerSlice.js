import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    // createCustomer: {
    //   reducer(state, action) {
    //     state.fullName = action.payload.fullName;
    //     state.nationalID = action.payload.nationalID;
    //     state.createAt = action.payload.createAt;
    //   },
    //   prepare(fullName, nationalID, createAt) {
    //     return {
    //       payload: {
    //         fullName,
    //         nationalID,
    //         createAt,
    //       },
    //     };
    //   },
    // },
    createCustomer(state, action) {
      console.log(action);
      state.fullName = action.payload.fullName;
      state.nationalID = action.payload.nationalId;
      state.createAt = action.payload.createAt;
    },
    updateName(state, action) {
      state.fullName = action.payload.fullName;
    },
  },
});

export default customerSlice.reducer;

export const { createCustomer, updateName } = customerSlice.actions;
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer": {
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createAt: action.payload.createAt,
//       };
//     }
//     case "customer/updateName": {
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID, createAt) {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName,
//       nationalID,
//       createAt,
//     },
//   };
// }

// export function updateName(fullName) {
//   return {
//     type: "customer/updateName",
//     payload: {
//       fullName,
//     },
//   };
// }
