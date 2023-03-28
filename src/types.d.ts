export type Theme = 'light' | 'dark';
export type Panels = 'Telescope' | 'WavefrontSensors' | 'Guider';
export type buttonState = 'PENDING' | 'ACTIVE' | 'DONE';
export type TargetType = 'radec' | 'altaz';
export type NavigateTargetType = 'fixed' | 'imported';
export type TargetObj = {
  id: string
  name: string
  sidereal?: {
    ra: {
      hms: string
      degrees: number
    },
    dec: {
      dms: string
      degrees: number
    }
  },
  navigateTarget?: NavigateTargetType
  az?: string
  az_wp1?: number
  az_wp2?: number
  el?: string
  rot?: number
  rot_wp1?: number
  rot_wp2?: number
  ha?: string
  zd?: number
  md?: number
};
export type WfsObj = {
  name: string;
}
export type AcObj = {
  name: string;
}
export type NodeStatus = 'inactive' | 'active' | 'idle';