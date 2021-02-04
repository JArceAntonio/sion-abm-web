import React from 'react';
import CircularProgress from "@material-ui/core/CircularProgress";

const FormLoader = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default FormLoader;
