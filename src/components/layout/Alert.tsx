import React, { Fragment, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

export type AlertType = null | {
  text: string;
  type: string;
};

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { alert } = alertContext;

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
