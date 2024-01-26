import { WebPlugin } from '@capacitor/core';

import type { SunmiCameraScannerPlugin } from './definitions';

export class SunmiCameraScannerWeb
  extends WebPlugin
  implements SunmiCameraScannerPlugin
{
  scan(): Promise<{ scans: { type: string; value: string; }[]; }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
