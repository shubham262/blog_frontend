import BlogState from './Blog/state';
const CombineState = () => {
	return {
		blog: BlogState(),
	};
};

export default CombineState;
