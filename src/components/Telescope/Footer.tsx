import { Button } from 'primereact/button'
import { Slew } from './GqlButtons'
import { TargetObj } from '../../types'


export default function Footer({ baseTarget, canEdit }: { baseTarget: TargetObj | undefined, canEdit: boolean }) {
  console.log(baseTarget)
  return (
    <div className="footer">
      <Button
        disabled={!canEdit}
        icon="pi pi-cog"
        className="p-button-rounded p-button-text btn-small"
        aria-label="Settings"
      />
      <Slew slewVars={{
          "zeroChopThrow": true,
          "zeroSourceOffset": true,
          "zeroSourceDiffTrack": true,
          "zeroMountOffset": true,
          "zeroMountDiffTrack": true,
          "shortcircuitTargetFilter": true,
          "shortcircuitMountFilter": true,
          "resetPointing": true,
          "stopGuide": true,
          "zeroGuideOffset": true,
          "zeroInstrumentOffset": true,
          "autoparkPwfs1": false,
          "autoparkPwfs2": false,
          "autoparkOiwfs": false,
          "autoparkGems": false,
          "autoparkAowfs": false,
          "id": baseTarget?.id,
          "name": baseTarget?.name,
          "ra": baseTarget?.sidereal?.ra?.hms,
          "dec": baseTarget?.sidereal?.dec?.dms,
          "epoch": baseTarget?.epoch,
          "wavelength": "400"
        }}
        disabled={!canEdit || !Boolean(baseTarget?.id)}
        className="btn-small"
        label="Slew Telescope"
      />
      <Button
        disabled={!canEdit}
        className="btn-small" label="Apply Parameters"
        aria-label="Apply Parameters"
      />
      <div></div>
      <Button
        disabled={!canEdit}
        className="btn-small p-button-danger right" label="Shutdown"
        aria-label="Shutdown"
      />
    </div>
  )
}