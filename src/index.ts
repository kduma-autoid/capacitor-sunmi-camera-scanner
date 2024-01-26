import { registerPlugin } from '@capacitor/core';

import type { SunmiCameraScannerPlugin } from './definitions';

const SunmiCameraScanner = registerPlugin<SunmiCameraScannerPlugin>(
  'SunmiCameraScanner',
  {
    web: () => import('./web').then(m => new m.SunmiCameraScannerWeb()),
  },
);

export * from './definitions';
export { SunmiCameraScanner };
