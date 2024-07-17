import { Checkbox } from 'primereact/checkbox';
import { Title } from '@Shared/Title/Title';
import { useAltairGuideLoop, useUpdateAltairGuideLoop } from '@gql/configs/AltairGuideLoop';

import { useGetGemsGuideLoop, useUpdateGemsGuideLoop } from '@gql/configs/GemsGuideLoop';
import { UpdateAltairGuideLoopMutationVariables, UpdateGemsGuideLoopMutationVariables } from '@gql/configs/gen/graphql';
import { useCanEdit } from '@/components/atoms/auth';

export function Altair() {
  const canEdit = useCanEdit();
  const { data, loading } = useAltairGuideLoop();
  const state = data?.altairGuideLoop;
  const [updateAltairGuideLoop, { loading: updateLoading }] = useUpdateAltairGuideLoop();

  function modifyAltairGuideLoop<T extends keyof UpdateAltairGuideLoopMutationVariables>(
    name: T,
    value: NonNullable<UpdateAltairGuideLoopMutationVariables[T]>,
  ) {
    if (state)
      updateAltairGuideLoop({
        variables: {
          pk: state.pk,
          [name]: value,
        },
      });
  }

  const disabled = !canEdit || loading || updateLoading;

  return (
    <div className="adaptive-optics">
      <Title title="Altair" />
      <div className="ao-body">
        <span className="label">AO enabled</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.aoEnabled}
          onChange={() => modifyAltairGuideLoop('aoEnabled', !state?.aoEnabled)}
        />
        <span className="label">OI blend</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.oiBlend}
          onChange={() => modifyAltairGuideLoop('oiBlend', !state?.oiBlend)}
        />
        <span className="label">Focus</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.focus}
          onChange={() => modifyAltairGuideLoop('focus', !state?.focus)}
        />
        <span className="label">P1 TTF</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.p1Ttf}
          onChange={() => modifyAltairGuideLoop('p1Ttf', !state?.p1Ttf)}
        />
        <span className="label">STRAP</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.strap}
          onChange={() => modifyAltairGuideLoop('strap', !state?.strap)}
        />
        <span className="label">OI TTF</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.oiTtf}
          onChange={() => modifyAltairGuideLoop('oiTtf', !state?.oiTtf)}
        />
        <span className="label">TTGS</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.ttgs}
          onChange={() => modifyAltairGuideLoop('ttgs', !state?.ttgs)}
        />
        <span className="label">SFO</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.sfo}
          onChange={() => modifyAltairGuideLoop('sfo', !state?.sfo)}
        />
      </div>
    </div>
  );
}

export function GeMS() {
  const canEdit = useCanEdit();
  const { data, loading: getLoading } = useGetGemsGuideLoop();
  const state = data?.gemsGuideLoop;
  const [updateGemsGuideLoop, { loading: updateLoading }] = useUpdateGemsGuideLoop();

  function modifyGemsGuideLoop<T extends keyof UpdateGemsGuideLoopMutationVariables>(
    name: T,
    value: NonNullable<UpdateGemsGuideLoopMutationVariables[T]>,
  ) {
    if (state)
      updateGemsGuideLoop({
        variables: {
          pk: state.pk,
          [name]: value,
        },
      });
  }

  const disabled = !canEdit || getLoading || updateLoading;

  return (
    <div className="adaptive-optics">
      <Title title="GeMS" />
      <div className="ao-body">
        <span className="label">AO enabled</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.aoEnabled}
          onChange={() => modifyGemsGuideLoop('aoEnabled', !state?.aoEnabled)}
        />
        <span className="label">Focus</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.focus}
          onChange={() => modifyGemsGuideLoop('focus', !state?.focus)}
        />
        <span className="label">Rotation</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.rotation}
          onChange={() => modifyGemsGuideLoop('rotation', !state?.rotation)}
        />
        <span className="label">Tip/Tilt</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.tipTilt}
          onChange={() => modifyGemsGuideLoop('tipTilt', !state?.tipTilt)}
        />
        <span className="label">Anisopl.</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.anisopl}
          onChange={() => modifyGemsGuideLoop('anisopl', !state?.anisopl)}
        />
        <span className="label">Flexure</span>
        <Checkbox
          disabled={disabled}
          checked={!!state?.flexure}
          onChange={() => modifyGemsGuideLoop('flexure', !state?.flexure)}
        />
      </div>
    </div>
  );
}
