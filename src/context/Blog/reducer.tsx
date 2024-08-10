import { Actions } from './action';

const reducer = (
	state: any,
	action: {
		type: any;
		payload: any;
	}
) => {
	switch (action.type) {
		case Actions.GET_ALL_POSTS_DATA_SUCCESS:
			return {
				...state,
				[action?.payload?.variableSelection]: action.payload?.value,
			};
		default:
			return state;
	}
};

export default reducer;
