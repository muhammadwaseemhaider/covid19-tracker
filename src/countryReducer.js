export default (state, action) => {
    switch (action.type) {
    case 'SET':
        return {
            ...state,
            country: action.payload
        }
    default:
        return state;
    }
}
