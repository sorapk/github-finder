import React, { Fragment } from 'react';

export type AlertType = null | {
  text: string;
  type: string;
};
interface AlertProp {
  alert: AlertType;
}
const Alert = ({ alert }: AlertProp) => {
  return (
    <Fragment>
      {alert !== null && (
        <div className={`alert alert-${alert.type}`}>
          <i className='fas fa-info-circle' style={{ marginRight: '0.5em' }} />
          {alert.text}
        </div>
      )}
    </Fragment>
  );
};

export default Alert;
