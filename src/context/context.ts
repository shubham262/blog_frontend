import React, { createContext, useContext, useState } from 'react';
import BlogState from './Blog/state';

interface CombinedState {
	blog: ReturnType<typeof BlogState>;
}
const defaultState: CombinedState = {
	blog: {},
};
// const ContextStates = createContext({});
const ContextStates = createContext<CombinedState | undefined>({ blog: {} });
export const useContextStates = () => useContext(ContextStates);
export default ContextStates;
