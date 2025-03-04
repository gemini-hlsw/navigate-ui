import type { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import {
  faLocationCrosshairs,
  faLocationCrosshairsSlash,
  faSquareParking,
  faSquareParkingSlash,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconFactory = (icon: IconDefinition) => <FontAwesomeIcon key={icon.iconName} icon={icon} />;

export const Crosshairs = iconFactory(faLocationCrosshairs);
export const CrosshairsSlash = iconFactory(faLocationCrosshairsSlash);

export const Parking = iconFactory(faSquareParking);
export const ParkingSlash = iconFactory(faSquareParkingSlash);
