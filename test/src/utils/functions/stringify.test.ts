import {safeStringify} from '../../../../src/utils/functions/stringify';

class ImplementingToJSON {
  toJSON(): string {
    return 'dummy!';
  }
}

class NotImplementingToJSON {}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
const emptyFunction = () => {};

describe('safeStringify', () => {
  it.each([
    [
      'strings',
      {
        BACKSPACE: '\b',
        CARRIAGE_RETURN: '\r',
        EMPTY_STRING: '',
        ESCAPE_RANGE: '\u0000\u001F',
        FORM_FEED: '\f',
        LINE_FEED: '\n',
        LOWERCASE: 'abc',
        MIXED: 'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b',
        NON_ESCAPE_RANGE: '\u0020\uFFFF',
        NUMBER_ONLY: '123',
        QUOTATION_MARK: '"',
        REVERSE_SOLIDUS: '\\',
        SOLIDUS: '/',
        TAB: '\t',
        UPPERCASE: 'ABC',
        UTF16: '☃',
        VALUES_WITH_SPACES: 'a b c',
      },
    ],
    [
      'object keys',
      {
        '': 'EMPTY_STRING',
        '\u0000\u001F': 'ESCAPE_RANGE',
        '\b': 'BACKSPACE',
        '\t': 'TAB',
        '\n': 'LINE_FEED',
        '\f': 'FORM_FEED',
        '\r': 'CARRIAGE_RETURN',
        '\u0020\uFFFF': 'NON_ESCAPE_RANGE',
        '"': 'QUOTATION_MARK',
        '/': 'SOLIDUS',
        ABC: 'UPPERCASE',
        'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b': 'MIXED',
        NUMBER_ONLY: '123',
        '\\': 'REVERSE_SOLIDUS',
        'a b c': 'VALUES_WITH_SPACES',
        abc: 'LOWERCASE',
        '☃': 'UTF16',
      },
    ],
    [
      'numbers',
      {
        FALSY: 0,
        FLOAT: 0.1234567,
        INFINITY: Infinity,
        MAX_SAFE_INTEGER: 9007199254740991,
        MAX_VALUE: 1.7976931348623157e308,
        MIN_SAFE_INTEGER: -9007199254740991,
        MIN_VALUE: 5e-324,
        NAN: NaN,
        NEGATIVE: -1,
        NEGATIVE_FLOAT: -0.9876543,
        NEGATIVE_MAX_VALUE: -1.7976931348623157e308,
        NEGATIVE_MIN_VALUE: -5e-324,
        NEG_INFINITY: -Infinity,
      },
    ],
    ['true', true],
    ['false', false],
    ['undefined', undefined],
    ['null', null],
    [
      'objects of undefineds',
      {ONE: undefined, THREE: undefined, TWO: undefined},
    ],
    ['objects of null', {NULL: null}],
    ['a Date instance', new Date('2017')],
    ['a function', function () {}],
    ['object that implements `toJSON`', new ImplementingToJSON()],
    ['objects that does not implements `toJSON`', new NotImplementingToJSON()],
    [
      'objects of mixed values',
      {
        'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b': 'MIXED',
        FALSE: false,
        MAX_VALUE: 1.7976931348623157e308,
        MIN_VALUE: 5e-324,
        MIXED: 'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b',
        NEGATIVE_MAX_VALUE: -1.7976931348623157e308,
        NEGATIVE_MIN_VALUE: -5e-324,
        NULL: null,
        TRUE: true,
        UNDEFINED: undefined,
        zzz: 'ending',
      },
    ],
    [
      'arrays of numbers',
      [
        9007199254740991,
        -9007199254740991,
        0,
        -1,
        0.1234567,
        -0.9876543,
        1.7976931348623157e308,
        5e-324,
        -1.7976931348623157e308,
        -5e-324,
        Infinity,
        -Infinity,
        NaN,
      ],
    ],
    [
      'arrays of strings',
      [
        'a b c',
        'abc',
        'ABC',
        'NUMBER_ONLY',
        '',
        '\u0000\u001F',
        '\u0020\uFFFF',
        '☃',
        '"',
        '\\',
        '/',
        '\f',
        '\n',
        '\r',
        '\t',
        '\b',
        'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b',
      ],
    ],
    ['arrays of booleans ', [true, false]],
    ['arrays of null', [null]],
    ['arrays of undefined', [undefined]],
    ['arrays of Date instances', [new Date('2017')]],
    ['arrays of instances that implement `toJSON`', [new ImplementingToJSON()]],
    [
      'arrays of instances that do not implement `toJSON`',
      [new NotImplementingToJSON()],
    ],
    ['arrays of functions', [emptyFunction]],
    [
      'arrays of mixed values',
      [
        -1.7976931348623157e308,
        -5e-324,
        'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b',
        true,
        false,
        null,
        undefined,
      ],
    ],
    [
      'mixed values',
      [
        {
          'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b': 'MIXED',
          DATE: new Date('2017'),
          FALSE: false,
          FUNCTION: emptyFunction,
          IMPLEMENTING_TO_JSON: new ImplementingToJSON(),
          MAX_VALUE: 1.7976931348623157e308,
          MIN_VALUE: 5e-324,
          MIXED: 'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b',
          NEGATIVE_MAX_VALUE: -1.7976931348623157e308,
          NEGATIVE_MIN_VALUE: -5e-324,
          NOT_IMPLEMENTING_TO_JSON: new NotImplementingToJSON(),
          NULL: null,
          TRUE: true,
          UNDEFINED: undefined,
          zzz: 'ending',
        },
        -1.7976931348623157e308,
        -5e-324,
        'Aa1 Bb2 Cc3 \u0000\u001F\u0020\uFFFF☃"\\/\f\n\r\t\b',
        true,
        false,
        null,
        undefined,
        new Date('2017'),
        emptyFunction,
        new ImplementingToJSON(),
        new NotImplementingToJSON(),
      ],
    ],
  ])(
    'matches the output of `json-stable-stringify` when hashing %s (`%s`)',
    (_, value) => {
      expect(safeStringify(value)).toBe(JSON.stringify(value));
    }
  );

  it('hashes bigints', () => {
    expect(safeStringify(BigInt(200))).toBe('{"dataType":"bi","value":"c8"}');
    expect(safeStringify({foo: BigInt(100), goo: '100n'})).toBe(
      '{"foo":{"dataType":"bi","value":"64"},"goo":"100n"}'
    );
    expect(safeStringify({age: BigInt(100), name: 'Hrushi'})).toBe(
      '{"age":{"dataType":"bi","value":"64"},"name":"Hrushi"}'
    );
    expect(safeStringify({age: [BigInt(100), BigInt(200), BigInt(300)]})).toBe(
      '{"age":[{"dataType":"bi","value":"64"},{"dataType":"bi","value":"c8"},{"dataType":"bi","value":"12c"}]}'
    );
  });
});
