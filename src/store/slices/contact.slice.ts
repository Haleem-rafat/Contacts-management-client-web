import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IContactStore } from '@servicesTypes/contact.types';
import { RootState } from '@store/store';

interface contactState {
  contact: IContactStore[];
}

const initialState: contactState = {
  contact: [],
};

// function to generate unique IDs
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Omit<IContactStore, 'id'>>) => {
      const newContact = { ...action.payload, id: generateId() };
      state.contact.push(newContact);
    },
    editContact: (state, action: PayloadAction<IContactStore>) => {
      const index = state.contact.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1) {
        state.contact[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contact = state.contact.filter((contact) => contact.id !== action.payload);
    },
  },
});

// Selectors
export const selectContact = (state: RootState): IContactStore[] => state.contact.contact;

// Actions
export const { addContact, editContact, deleteContact } = contactSlice.actions;

export default contactSlice.reducer;
