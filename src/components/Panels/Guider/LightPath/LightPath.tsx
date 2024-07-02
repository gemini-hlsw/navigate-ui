import { Button } from 'primereact/button';
import { Title } from '@Shared/Title/Title';
import { useContext } from 'react';
import { AuthContext } from '@Contexts/Auth/AuthProvider';
import { Dropdown } from 'primereact/dropdown';
import { UpdateGuideLoopVariables, useGetGuideLoop, useUpdateGuideLoop } from '@gql/configs/GuideLoop';
import { GuideLoop } from '@gql/configs/gen/graphql';

export function LightPath() {
  const { canEdit } = useContext(AuthContext);

  const { data, updateQuery, loading } = useGetGuideLoop();
  const [updateGuideLoop, { loading: updateLoading }] = useUpdateGuideLoop();
  const state = data?.guideLoop ?? ({} as GuideLoop);
  const lightPath = state.lightPath;

  function modifyGuideLoop<T extends keyof UpdateGuideLoopVariables>(name: T, value: UpdateGuideLoopVariables[T]) {
    updateGuideLoop({
      variables: {
        pk: state.pk,
        [name]: value,
      },
      onCompleted(data) {
        updateQuery(() => ({ guideLoop: data.updateGuideLoop }));
      },
    });
  }
  const disabled = !canEdit || loading || updateLoading;

  return (
    <div className="light-path">
      <Title title="Light path" />
      <div className="body">
        <Dropdown
          disabled={disabled}
          value={lightPath}
          options={[
            'Sky ➡ Instrument',
            'Sky ➡ AO ➡ Instrument',
            'Sky ➡ AC',
            'Sky ➡ AO ➡ AC',
            'GCAL ➡ Instrument',
            'GAOS ➡ Instrument',
          ]}
          onChange={() => modifyGuideLoop('lightPath', lightPath)}
          placeholder="Select a light  path"
        />
        <Button disabled={disabled} label="Set" onClick={() => modifyGuideLoop('lightPath', lightPath)} />
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
