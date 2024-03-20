import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const acountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      reducer(state, action) {
        if (state.loan > 0) return;
        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.loanPurpose;
      },
      prepare(amount, loanPurpose) {
        return {
          payload: {
            amount,
            loanPurpose,
          },
        };
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertCorrency(state) {
      state.isLoading = true;
    },
  },
});

export default acountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = acountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  //thunk 返回的是个函数
  return async function (dispatch, getState) {
    dispatch({
      type: "account/convertCorrency",
    });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({
      type: "account/deposit",
      payload: data.rates.USD,
    });
  };
}

/** 
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/convertCorrency": {
      return {
        ...state,
        isLoading: true,
      };
    }
    case "account/deposit": {
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    }
    case "account/withdraw": {
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    }
    case "account/requestLoan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
      };
    }
    case "account/payLoan": {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    }
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  return async function (dispatch, getState) {
    dispatch({
      type: "account/convertCorrency",
    });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({
      type: "account/deposit",
      payload: data.rates.USD,
    });
  };
}

export function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

export function requestLoan(amount, loanPurpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      loanPurpose,
    },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
