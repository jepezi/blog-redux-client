import handleAction from './handleAction';

function reduceReducers(...reducers) {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}

export default function handleActions(handlers, defaultState) {
  const reducers = Object.keys(handlers).map(type => {
    return handleAction(type, handlers[type]);
  });

  return typeof defaultState !== 'undefined'
    ? (state = defaultState, action) => reduceReducers(...reducers)(state, action)
    : reduceReducers(...reducers);
}
