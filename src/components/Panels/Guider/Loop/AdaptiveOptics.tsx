import { Checkbox } from 'primereact/checkbox';
import { Title } from '@Shared/Title/Title';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@Contexts/Auth/AuthProvider';
import { useGetAltairGuideLoop, useUpdateAltairGuideLoop } from '@gql/configs/AltairGuideLoop';
import { AltairGuideLoopType, GemsGuideLoopType } from '@/types';
import { useGetGemsGuideLoop, useUpdateGemsGuideLoop } from '@gql/configs/GemsGuideLoop';

export function Altair() {
  const { canEdit } = useContext(AuthContext);
  const [state, setState] = useState<AltairGuideLoopType>({} as AltairGuideLoopType);
  const getAltairGuideLoop = useGetAltairGuideLoop();
  const updateAltairGuideLoop = useUpdateAltairGuideLoop();

  useEffect(() => {
    getAltairGuideLoop({
      onCompleted(data) {
        setState(data.altairGuideLoop);
      },
    });
  }, []);

  function modifyAltairGuideLoop(name: string, value: boolean) {
    updateAltairGuideLoop({
      variables: {
        pk: state.pk,
        [name]: value,
      },
      onCompleted(data) {
        setState(data.updateAltairGuideLoop);
      },
    });
  }

  return (
    <div className="adaptive-optics">
      <Title title="Altair" />
      <div className="ao-body">
        <span className="label">AO enabled</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.aoEnabled}
          onChange={() => modifyAltairGuideLoop('aoEnabled', !state.aoEnabled)}
        />
        <span className="label">OI blend</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.oiBlend}
          onChange={() => modifyAltairGuideLoop('oiBlend', !state.oiBlend)}
        />
        <span className="label">Focus</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.focus}
          onChange={() => modifyAltairGuideLoop('focus', !state.focus)}
        />
        <span className="label">P1 TTF</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.p1Ttf}
          onChange={() => modifyAltairGuideLoop('p1Ttf', !state.p1Ttf)}
        />
        <span className="label">STRAP</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.strap}
          onChange={() => modifyAltairGuideLoop('strap', !state.strap)}
        />
        <span className="label">OI TTF</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.oiTtf}
          onChange={() => modifyAltairGuideLoop('oiTtf', !state.oiTtf)}
        />
        <span className="label">TTGS</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.ttgs}
          onChange={() => modifyAltairGuideLoop('ttgs', !state.ttgs)}
        />
        <span className="label">SFO</span>
        <Checkbox disabled={!canEdit} checked={state.sfo} onChange={() => modifyAltairGuideLoop('sfo', !state.sfo)} />
      </div>
    </div>
  );
}

export function GeMS() {
  const { canEdit } = useContext(AuthContext);
  const [state, setState] = useState<GemsGuideLoopType>({} as GemsGuideLoopType);
  const getGemsGuideLoop = useGetGemsGuideLoop();
  const updateGemsGuideLoop = useUpdateGemsGuideLoop();

  useEffect(() => {
    getGemsGuideLoop({
      onCompleted(data) {
        setState(data.gemsGuideLoop);
      },
    });
  }, []);

  function modifyGemsGuideLoop(name: string, value: boolean) {
    updateGemsGuideLoop({
      variables: {
        pk: state.pk,
        [name]: value,
      },
      onCompleted(data) {
        setState(data.updateGemsGuideLoop);
      },
    });
  }

  return (
    <div className="adaptive-optics">
      <Title title="GeMS" />
      <div className="ao-body">
        <span className="label">AO enabled</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.aoEnabled}
          onChange={() => modifyGemsGuideLoop('aoEnabled', !state.aoEnabled)}
        />
        <span className="label">Focus</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.focus}
          onChange={() => modifyGemsGuideLoop('focus', !state.focus)}
        />
        <span className="label">Rotation</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.rotation}
          onChange={() => modifyGemsGuideLoop('rotation', !state.rotation)}
        />
        <span className="label">Tip/Tilt</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.tipTilt}
          onChange={() => modifyGemsGuideLoop('tipTilt', !state.tipTilt)}
        />
        <span className="label">Anisopl.</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.anisopl}
          onChange={() => modifyGemsGuideLoop('anisopl', !state.anisopl)}
        />
        <span className="label">Flexure</span>
        <Checkbox
          disabled={!canEdit}
          checked={state.flexure}
          onChange={() => modifyGemsGuideLoop('flexure', !state.flexure)}
        />
      </div>
    </div>
  );
}
