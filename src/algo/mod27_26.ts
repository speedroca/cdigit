/**
 * cdigit
 *
 * @copyright 2018 LiosK
 * @license Apache-2.0
 */

import { Algo, helper } from './common';

/** ISO/IEC 7064, MOD 27-26 implementation */
class Mod27_26 implements Algo {
  private alphabet: string = helper.iso7064.alphabetic;

  compute(num: string): string {
    const ds = String(num).replace(/[^A-Z]/g, '');
    return helper.iso7064.computeHybrid(ds, this.alphabet);
  }

  generate(num: string): string {
    return `${num}${this.compute(num)}`;
  }

  validate(num: string): boolean {
    const [src, cc] = this.parse(num);
    return this.compute(src) === cc;
  }

  parse(num: string): [string, string] {
    return helper.parseTail(num, 1);
  }
}

export default new Mod27_26();