const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}


export default function customerReducer(state = initialStateCustomer, action) {

    switch (action.type) {

        case "customer/createCustomer":
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID }
        case "customer/updateName":
            return { ...state, fullName: action.payload }

        default:
            return state
    }
}


export const createCustomer = (fullName, nationalID) => ({
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString()}
})

export const updateName = (fullName) => ({ type: "customer/updateName", payload: fullName})
