import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', name: 'Med Salah Naija' },
  { id: '2', name: 'Manel Kacem' },
  { id: '3', name: 'Ahmed Hamouda' },
  { id: '4', name: 'Housem Bouraoui' },
  { id: '5', name: 'Heni Mezrani' },
  { id: '6', name: 'Oussema Aroua' },
]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {}
})

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer
