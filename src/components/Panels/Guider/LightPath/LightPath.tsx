import { useCanEdit } from '@/components/atoms/auth';
import { Title } from '@Shared/Title/Title';
import { useGetGuideLoop, useUpdateGuideLoop } from '@gql/configs/GuideLoop';
import { GuideLoop, UpdateGuideLoopMutationVariables } from '@gql/configs/gen/graphql';
import { useLightpathConfig } from '@gql/server/Lightpath';
import { LightSink, LightSource } from '@gql/server/gen/graphql';
import clsx from 'clsx';
import { Button } from 'primereact/button';
import { useCallback } from 'react';

export function LightPath() {
  const canEdit = useCanEdit();

  const { data, loading: getLoading } = useGetGuideLoop();
  const [updateGuideLoop, { loading: updateLoading }] = useUpdateGuideLoop();
  const state = data?.guideLoop ?? ({} as Partial<GuideLoop>);
  const lightPath = state.lightPath;

  const [updateLightpathConfig, { loading: lightpathConfigLoading }] = useLightpathConfig();

  async function modifyGuideLoop<T extends keyof UpdateGuideLoopMutationVariables>(
    name: T,
    value: UpdateGuideLoopMutationVariables[T],
  ) {
    if (state.pk)
      await updateGuideLoop({
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
  const loading = getLoading || updateLoading || lightpathConfigLoading;

  const options: { label: string; from: LightSource; to: LightSink }[] = [
    { label: 'Sky → Instrument', from: 'SKY', to: 'GMOS' },
    { label: 'Sky → AO → Instrument', from: 'SKY', to: 'GMOS' },
    { label: 'Sky → AC', from: 'SKY', to: 'AC' },
    { label: 'Sky → AO → AC', from: 'SKY', to: 'AC' },
    { label: 'GCAL → Instrument', from: 'GCAL', to: 'GMOS' },
  ] as const;

  const onClick = useCallback(
    async (newLightPath: string, from: LightSource, to: LightSink) => {
      await Promise.all([
        modifyGuideLoop('lightPath', newLightPath),
        updateLightpathConfig({
          variables: { from, to },
        }),
      ]);
    },
    [lightPath],
  );

  return (
    <div className="light-path">
      <Title title="Light path" />
      <div className="body">
        {options.map(({ label, from, to }) => {
          return (
            <Button
              icon={clsx(label === lightPath && 'pi pi-check')}
              key={label}
              loading={loading}
              disabled={disabled}
              label={label}
              onClick={() => void onClick(label, from, to)}
            />
          );
        })}
      </div>
    </div>
  );
}
