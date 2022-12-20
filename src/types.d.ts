export type Theme = 'light' | 'dark';
export type Panels = 'Telescope' | 'WavefrontSensors' | 'Guider';
export type ParkStatus = 'PENDING' | 'ACTIVE' | 'DONE';
export type TargetType = 'radec' | 'altaz';
export type TargetObj = {
  name: string;
  type: TargetType;
  ra?: string;
  dec?: string;
  az?: string;
  az_wp1?: number;
  az_wp2?: number;
  el?: string;
  rot?: number;
  rot_wp1?: number;
  rot_wp2?: number;
  ha?: string;
  zd?: number;
  md?: number;
};
export type WfsObj = {
  name: string;
}
export type AcObj = {
  name: string;
}
export type NodeStatus = 'inactive' | 'active' | 'idle';