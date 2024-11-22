import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import './Login.scss';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useOdbToken } from '../atoms/odb';

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
            <i className="pi pi-key"></i>
          </span>
          <InputText placeholder="ODB Token" value={auxOdbToken} onChange={(e) => setAuxOdbToken(e.target.value)} />
        </div>
        <Button
          label="Done"
          icon="pi pi-check"
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
