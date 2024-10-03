import { Button } from 'primereact/button';
import { Title } from '@Shared/Title/Title';
import { Dropdown } from 'primereact/dropdown';
import { useGetGuideLoop, useUpdateGuideLoop } from '@gql/configs/GuideLoop';
import { GuideLoop, UpdateGuideLoopMutationVariables } from '@gql/configs/gen/graphql';
import { useCanEdit } from '@/components/atoms/auth';

export function LightPath() {
  const canEdit = useCanEdit();

  const { data, loading: getLoading } = useGetGuideLoop();
  const [updateGuideLoop, { loading: updateLoading }] = useUpdateGuideLoop();
  const state = data?.guideLoop ?? ({} as Partial<GuideLoop>);
  const lightPath = state.lightPath;

  function modifyGuideLoop<T extends keyof UpdateGuideLoopMutationVariables>(
    name: T,
    value: UpdateGuideLoopMutationVariables[T],
  ) {
    if (state.pk)
      void updateGuideLoop({
        variables: {
          pk: state.pk,
          [name]: value,
        },
        optimisticResponse: {
          updateGuideLoop: {
            ...(state as GuideLoop),
            [name]: value,
          },
        },
      });
  }
  const disabled = !canEdit;
  const loading = getLoading || updateLoading;

  return (
    <div className="light-path under-construction">
      <Title title="Light path" />
      <div className="body">
        <Dropdown
          disabled={disabled}
          loading={loading}
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
        <Button disabled={disabled || loading} label="Set" onClick={() => modifyGuideLoop('lightPath', lightPath)} />
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
