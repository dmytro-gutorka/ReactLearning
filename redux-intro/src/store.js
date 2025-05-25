const initialState = {
    balance: 0,
    loan: 0,
    loadPurpose: '',
}


function reducer(state = initialState, action) {

    switch(action.type) {

        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/request":
            if (state.loan > 0) return state
            return { ...state, loan: action.payload }
        case "action/payLoan":
            return { ...state, loan: 0, loadPurpose: '', balance: state.balance - state.loan }
        default:
            return state;
    }
}