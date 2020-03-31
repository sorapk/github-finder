import AlertContext, {
  InitAlertState,
  AlertContextState
} from './alertContext';
import React, { useReducer, Reducer } from 'react';
import { AlertAction, alertReducer } from './alertReducer';
import { eAlertActionTypes } from '../types';

const AlertState = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<AlertContextState, AlertAction>>(
    alertReducer,
    InitAlertState
  );
  // console.log('alert state update', state);
  const setAlert = (text: string, type: string, timeout_ms?: number) => {
    dispatch({
      type: eAlertActionTypes.SET_ALERT,
      payload: { type: type, text: text }
    });
    setTimeout(
      () => {
        removeAlert();
      },
      timeout_ms ? timeout_ms : 5000
    );
  };
  const removeAlert = () => {
    dispatch({ type: eAlertActionTypes.REMOVE_ALERT });
  };

  return (
    <AlertContext.Provider
      value={{
        removeAlert: removeAlert,
        setAlert: setAlert,
        alert: state.alert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
