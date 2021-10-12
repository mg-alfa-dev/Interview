import { useDispatch, useSelector } from 'react-redux';

/**
 * @template T
 * @typedef {import('redux').Dispatch<T>} Dispatch<T>
 */
/**
 * @template T
 * @typedef {import('react-redux').TypedUseSelectorHook<T>} TypedUseSelectorHook<T>
 */
/**
 * @typedef {import('./store').AppDispatch} AppDispatch
 * @typedef {import('./store').RootState} RootState
 */

// Use throughout your app instead of plain `useDispatch` and `useSelector`

/**
 * @returns {Dispatch<AppDispatch>}
 */
export const useAppDispatch = () => useDispatch();

/**
 * @type {TypedUseSelectorHook<RootState>}
 */
export const useAppSelector = useSelector;
