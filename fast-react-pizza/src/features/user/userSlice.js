import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}


export const fetchAddress = createAsyncThunk('user/fetchAddress', async function() {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  return { position, address };
})


const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: ''
}


const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
      fetchAddress.pending,
      (state) => {
        state.status = 'loading'
      })
      .addCase(
        fetchAddress.fulfilled,
        (state, action) => {
          state.status = 'idle'
          state.position = action.payload.position
          state.address = action.payload.address
        })
      .addCase(
        fetchAddress.rejected,
        (state, action) => {
          state.status = 'error'
          state.error = action.error.message
        })
})


export const getUserName = state => state.user.username


export const { updateName } = userSlice.actions;

export default userSlice.reducer