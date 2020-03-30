import React from 'react';
import { AlertType } from '../../components/layout/Alert';
import { eAlertActionTypes } from '../types';
import { AlertContextState } from './alertContext';

export interface AlertAction {
  type: eAlertActionTypes;
  payload?: AlertType;
}

export const alertReducer = (
  state: AlertContextState,
  action: AlertAction
): AlertContextState => {
  let nextState = state;
  const { type, payload } = action;

  switch (type) {
    case eAlertActionTypes.SET_ALERT:
      nextState = { alert: payload as AlertType };
      break;
    case eAlertActionTypes.REMOVE_ALERT:
      nextState = { alert: null };
      break;
    default:
      break;
  }

  return nextState;
};
