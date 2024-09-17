import { createStore, combineReducers } from 'redux';
import formReducers from "./reducers/formReducer";
import formSettlement from "./reducers/formSettlementReducer";
import formForeigners from "./reducers/foreignersReducer";

const rootReducer = combineReducers({
    form: formReducers,
    formSettlement: formSettlement,
    formForeigners: formForeigners,
});

const store = createStore(rootReducer);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
