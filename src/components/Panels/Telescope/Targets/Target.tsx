import { useContext, useRef } from 'react';
import { TargetType } from '@/types';
import { AuthContext } from '@Contexts/Auth/AuthProvider';
import { VariablesContext } from '@Contexts/Variables/VariablesProvider';
import { useLongPress } from '@/Helpers/longPress';

export function Target({
  target,
  updateSelectedTarget,
  selectedTarget = undefined,
  targetIndex = undefined,
}: {
  target: TargetType;
  updateSelectedTarget(target: number): void;
  selectedTarget?: number | null;
  targetIndex?: number | undefined;
}) {
  const { canEdit } = useContext(AuthContext);
  const { setTargetEdit } = useContext(VariablesContext);
  const clickRef = useRef<ReturnType<typeof setTimeout>>();

  function onLongPress() {
    clearTimeout(clickRef.current);
    setTargetEdit({
      isVisible: true,
      target: target,
      targetIndex: targetIndex,
    });
  }

  const longPressEvent = useLongPress(onLongPress, targetClicked, {
    shouldPreventDefault: true,
    delay: 250,
  });

  function targetClicked(e: React.MouseEvent | React.TouchEvent) {
    if (!canEdit) return;
    switch (e.detail) {
      case 1:
        clickRef.current = setTimeout(() => {
          updateSelectedTarget(target.pk);
        }, 300);
        break;
      case 2:
        clearTimeout(clickRef.current);
        setTargetEdit({
          isVisible: true,
          target: target,
          targetIndex: targetIndex,
        });
        break;
      default:
        break;
    }
  }

  if (target.type === 'FIXED') {
    return (
      <li
        className={`${selectedTarget === target.pk ? 'selected-target' : ''}`}
        key={`science-target`}
        {...longPressEvent}
      >
        <div className="target-item">
          <span className="target-name" title={target.name ?? undefined}>
            {target.name}
          </span>
          <span className="text-right">{target.az?.dms}</span>
          <span>Az</span>
          <span className="text-right">{target.el?.dms}</span>
          <span>El</span>
        </div>
      </li>
    );
  } else {
    return (
      <li
        className={`${selectedTarget === target.pk ? 'selected-target' : ''}`}
        key={`science-target`}
        {...longPressEvent}
      >
        <div className="target-item">
          <span className="target-name" title={target.name ?? undefined}>
            {target.name}
          </span>
          <span className="text-right">{target.ra?.hms}</span>
          <span>RA</span>
          <span className="text-right">{target.dec?.dms}</span>
          <span>Dec</span>
        </div>
      </li>
    );
  }
}
