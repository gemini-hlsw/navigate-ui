import './Login.scss';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useOdbToken } from '../atoms/odb';
import { Check, Key } from '../Icons';

export default function Token() {
  const navigate = useNavigate();
  const [odbToken, setOdbToken] = useOdbToken();
  const [auxOdbToken, setAuxOdbToken] = useState(odbToken);

  return (
    <div className="login">
      <div className="box">
        <div className="title">
          <div className="text">Navigate</div>
        </div>
        <div className="p-inputgroup mb-10">
          <span className="p-inputgroup-addon">
            <Key />
          </span>
          <InputText placeholder="ODB Token" value={auxOdbToken} onChange={(e) => setAuxOdbToken(e.target.value)} />
        </div>
        <Button
          label="Done"
          icon={<Check className="p-button-icon-right" />}
          iconPos="right"
          className=" p-button-success"
          onClick={() => {
            setOdbToken(auxOdbToken);
            void navigate('/');
          }}
        />
      </div>
    </div>
  );
}
