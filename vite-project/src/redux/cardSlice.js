import { createSlice } from "@reduxjs/toolkit";



const cardSlice = createSlice({
    name: "cards",
    initialState: {
        cards: [{
            id: 1,
            cardNumber: "0000000000000000",
            cardHolder: 'Shishi Chen',
            validThru: '2030-07',
            ccv: '888',
            vendor: 'CCB',
            isActivited: true
        }],
    },
    reducers: {
        addCard: (state, action) => {
            if (state.cards.length < 4) {
                console.log('Action:', action);
                state.cards.push(action.payload)
            }
        },
        deleteCard: (state, action) => {
            const {id} = action.payload
            state.cards = state.cards.filter(card => card.id !== id);
        },
        editCard: (state, action) => {
            console.log('Action:', action);
            const {id, newCardNumber, newCardHolder, newValidThru, newCcv, newVendor, updateActiviteState} = action.payload
            const cardIndex = state.cards.findIndex(card => card.id === id);
            if(cardIndex !== -1) {
                state.cards[cardIndex].cardNumber = newCardNumber;
                state.cards[cardIndex].cardHolder = newCardHolder;
                state.cards[cardIndex].validThru = newValidThru;
                state.cards[cardIndex].ccv = newCcv;
                state.cards[cardIndex].vendor = newVendor;
                state.cards[cardIndex].isActivited = updateActiviteState;
            }
        },
        deleteAllInactiveCards: (state, action) => {
            state.cards = state.cards.filter(card => card.isActivited !== false)
        }
    }
})

export default cardSlice.reducer;
export const { addCard, deleteCard, editCard, deleteAllInactiveCards } = cardSlice.actions;