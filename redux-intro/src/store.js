import {combineReducers, createStore} from 'redux';


const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
}


const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}


function accountReducer(state = initialStateAccount, action) {

    switch(action.type) {

        case "account/deposit":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0) return state
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose }
        case "account/payLoan":
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }

        default:
            return state;
    }
}


function customerReducer(state = initialStateCustomer, action) {

    switch (action.type) {

        case "customer/createCustomer":
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID }
        case "customer/updateName":
            return { ...state, fullName: action.payload }

        default:
            return state
    }
}


const deposit = (amount) =>  ({ type: 'account/deposit', payload: amount })

const withdraw = (amount) =>  ({ type: 'account/withdraw', payload: amount })

const requestLoan = (amount, purpose) =>  ({ type: 'account/requestLoan', payload: {amount, purpose} })

const payLoan = () =>  ({ type: 'account/payLoan' })

const createCustomer = (fullName, nationalID) => ({
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString()
    }})

const updateName = (fullName) => ({ type: "customer/updateName", payload: fullName})


const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
})


const store = createStore(rootReducer)


store.dispatch(deposit(1000))
store.dispatch(withdraw(500))
store.dispatch(requestLoan(5000, 'buy a house'))
store.dispatch(payLoan())

store.dispatch(createCustomer('Dima', 11112222))
store.dispatch(updateName('NEdima'))


console.log(store.getState())
