export default function ReducerTestSaga(prevState = {
    list1: [],
    list2: []
}, action) {
    const newState = {
        ...prevState
    };
    switch (action.type) {
        case "change-list":
            newState.list1 = action.payload
            return newState;
        case "change-list2":
            newState.list2 = action.payload
            return newState;
        default:
            return prevState;
    }
}