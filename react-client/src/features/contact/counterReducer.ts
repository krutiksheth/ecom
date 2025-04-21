export type CounterState= {
    data: number
}

const initialState: CounterState = {
    data: 42,
}

export default function counterReducer(state= initialState, action : { type: string}){
    switch(action.type){
        
        case 'INCREMENT':
            return {
                ...state, 
                data : state.data + 1 
            };
        case 'DECREMENT':
            return {
                ...state,
                data : state.data - 1
            }
        default:
            return state
        
    }
}