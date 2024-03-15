import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
// store.dispatch(deposit(2000));
// console.log(store.getState());
// store.dispatch(requestLoan(1000, "buy a car"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());
// store.dispatch(withdraw(1000));
// console.log(store.getState());

// store.dispatch(createCustomer("zs", "123333", new Date().toISOString()));
// console.log(store.getState());
// const store = createStore(reducer);
// console.log(store.getState());
// store.dispatch({
//   type: "account/deposit",
//   payload: 400,
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/withdraw",
//   payload: 200,
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/requestLoan",
//   payload: {
//     amount: 1000,
//     loanPurpose: "buy a car",
//   },
// });
// console.log(store.getState());
// store.dispatch({
//   type: "account/payLoan",
// });
// console.log(store.getState());
