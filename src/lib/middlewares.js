const shouldNormalize = true;
import { /*Schema, arrayOf,*/ normalize } from 'normalizr';

// thunk mx
export function thunk({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}

// promise mx
import uniqueId from 'lodash/uniqueId';
import isPlainObject from 'lodash/isPlainObject';

const validKeys = [
  'type',
  'payload',
  'error',
  'meta'
];

function isValidKey(key) {
  return validKeys.indexOf(key) > -1;
}

function isFSA(action) {
  return (
    isPlainObject(action) &&
    typeof action.type !== 'undefined' &&
    Object.keys(action).every(isValidKey)
  );
}

function isError(action) {
  return action.error === true;
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

export function promise({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    if (isPromise(action.payload)) {
      const sequenceId = uniqueId();

      dispatch({
        ...action,
        payload: undefined,
        sequence: {
          type: 'start',
          id: sequenceId
        }
      });

      return action.payload.then(
        result => {
          return dispatch({
            ...action,
            payload: shouldNormalize ? normalize(result, action.meta.schema) : result,
            sequence: {
              type: 'next',
              id: sequenceId
            }
          })
        },
        error => {
          return dispatch({
            ...action,
            payload: error,
            error: true,
            sequence: {
              type: 'next',
              id: sequenceId
            }
          })
        }
      );
    }

    return next(action);
  };
}
