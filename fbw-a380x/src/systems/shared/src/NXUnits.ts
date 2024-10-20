/**
 * Unit conversion utilities
 */
import { NXDataStore } from '@shared/persistence';

export class NXUnits {
  private static _metricWeight: boolean;

  static get metricWeight() {
    if (NXUnits._metricWeight === undefined) {
      NXDataStore.getAndSubscribe(
        'CONFIG_USING_METRIC_UNIT',
        (_, value: string) => {
          NXUnits._metricWeight = value === '1';
        },
        '1',
      );
    }
    return NXUnits._metricWeight;
  }

  static userToKg(value: number) {
    return NXUnits.metricWeight ? value : value / 2.204625;
  }

  static kgToUser(value: number) {
    return NXUnits.metricWeight ? value : value * 2.204625;
  }

  static userWeightUnit() {
    return NXUnits.metricWeight ? 'KG' : 'LBS'; // EIS uses S suffix on LB
  }
}
