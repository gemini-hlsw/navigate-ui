import { Button } from 'primereact/button';
import { Title } from '@Shared/Title/Title';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@Contexts/Auth/AuthProvider';
import { Dropdown } from 'primereact/dropdown';
import { useGetGuideLoop, useUpdateGuideLoop } from '@gql/configs/GuideLoop';
import { GuideLoopType } from '@/types';

export function LightPath() {
  const { canEdit } = useContext(AuthContext);
  const [lightPath, setLightPath] = useState('');
  const [state, setState] = useState<GuideLoopType>({} as GuideLoopType);
  const getGuideLoop = useGetGuideLoop();
  const updateGuideLoop = useUpdateGuideLoop();

  useEffect(() => {
    getGuideLoop({
      onCompleted(data) {
        setState(data.guideLoop);
        setLightPath(data.guideLoop.lightPath);
      },
    });
  }, []);

  function modifyGuideLoop(name: string, value: boolean | string) {
    updateGuideLoop({
      variables: {
        pk: state.pk,
        [name]: value,
      },
      onCompleted(data) {
        setState(data.updateGuideLoop);
      },
    });
  }

  return (
    <div className="light-path">
      <Title title="Light path" />
      <div className="body">
        <Dropdown
          disabled={!canEdit}
          value={lightPath}
          options={[
            'Sky ➡ Instrument',
            'Sky ➡ AO ➡ Instrument',
            'Sky ➡ AC',
            'Sky ➡ AO ➡ AC',
            'GCAL ➡ Instrument',
            'GAOS ➡ Instrument',
          ]}
          onChange={(e) => setLightPath(e.target.value)}
          placeholder="Select a light  path"
        />
        <Button disabled={!canEdit} label="Set" onClick={() => modifyGuideLoop('lightPath', lightPath)} />
        {/* <Button disabled={!canEdit} label="Sky → Instrument" />
        <Button disabled={!canEdit} label="Sky → AO → Instrument" />
        <Button disabled={!canEdit} label="Sky → AC" />
        <Button disabled={!canEdit} label="Sky → AO → AC" />
        <Button disabled={!canEdit} label="GCAL → Instrument" />
        <Button disabled={!canEdit} label="GAOS → Instrument" /> */}
      </div>
    </div>
  );
}
