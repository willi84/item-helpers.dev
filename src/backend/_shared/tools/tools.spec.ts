import { detectType, replaceAll } from './tools';
describe('check types', () => {
    it('detect boolean', () => {
      expect(detectType('true')).toEqual('boolean')
      expect(detectType('false')).toEqual('boolean')
      expect(detectType('TrUE')).toEqual('boolean')
      expect(detectType('False ')).toEqual('boolean')
    });
    it('detect string', () => {
      expect(detectType('Das ist ein String ')).toEqual('string')
      expect(detectType('Das ist ein false positive ')).toEqual('string')
    });
    it('check integer', () => {
      expect(detectType('3.x')).toEqual('string')
      expect(detectType('3')).toEqual('number')
      expect(detectType('3.3')).toEqual('number')
      expect(detectType('I haxve 3.3 horses')).toEqual('string'); // false positive
    })
});

describe('check replaceAll', () => {
    it('replace detected items', () => {
        const input = 'Das ist ein doppeltes ist hier.';
        const output = 'Das dort ein doppeltes dort hier.';
        expect(replaceAll(input, 'ist', 'dort')).toEqual(output);
    });
});