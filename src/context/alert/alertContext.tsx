import { createContext } from 'react';
import { AlertType } from '../../components/layout/Alert';

export interface AlertContextState {
  alert: AlertType | null;
}
export interface AlertContextMethod {
  setAlert: (text: string, type: string, timeout_ms?: number) => void;
  removeAlert: () => void;
}

export const InitAlertState: AlertContextState = { alert: null };
export const InitAlertMethod: AlertContextMethod = {
  setAlert: (text: string, type: string) => console.assert('Context not set'),
  removeAlert: () => console.assert('Context not set')
};

const AlertContext = createContext<AlertContextState & AlertContextMethod>({
  ...InitAlertState,
  ...InitAlertMethod
});

export default AlertContext;
