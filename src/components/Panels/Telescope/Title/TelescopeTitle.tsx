import { Title, TitleDropdown } from '@Shared/Title/Title';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { useSetOdbVisible } from '@/components/atoms/odb';
import { useCanEdit } from '@/components/atoms/auth';

interface ParamsInterface {
  prevPanel: () => void;
  nextPanel: () => void;
}

export function TelescopeTitle({ prevPanel, nextPanel }: ParamsInterface) {
  const canEdit = useCanEdit();
  const setOdbVisible = useSetOdbVisible();

  return (
    <Title title="TELESCOPE SETUP" prevPanel={prevPanel} nextPanel={nextPanel}>
      <TitleDropdown icon="list">
        <Button
          disabled={!canEdit}
          className="p-button-text"
          label="Import from ODB"
          onClick={() => setOdbVisible(true)}
        />
        <Button
          disabled={!canEdit}
          className="p-button-text"
          label="Import from catalog"
          onClick={() => console.log('Open catalog modal')}
        />
        <Divider />
        <Button disabled={!canEdit} className="p-button-text" label="Edit targets" />
      </TitleDropdown>
    </Title>
  );
}
