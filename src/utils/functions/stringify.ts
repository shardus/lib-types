const objToString = Object.prototype.toString;

const objKeys =
  Object.keys ||
  function (obj): unknown[] {
    const keys = [];
    for (const name in obj) {
      keys.push(name);
    }
    return keys;
  };

const isObject = (val: unknown): boolean => {
  if (val === null) {
    return false;
  }
  if (Array.isArray(val)) {
    return false;
  }
  return typeof val === 'function' || typeof val === 'object';
};

/**
 * Safely converts a value to a string representation.
 *
 * @param val - The value to be converted.
 * @param options - The options for stringify (optional).
 * @returns The string representation of the value.
 */
export function safeStringify(
  val: unknown,
  options: stringifyOptions = defaultOptions
): string | undefined {
  const returnVal = stringifyHelper(val, false, options);
  if (returnVal !== undefined) {
    return '' + returnVal;
  }
  return undefined;
}

/**
 * Safely parses a JSON string into an object.
 * If parsing fails, it returns an object with an error property.
 *
 * @param value - The JSON string to parse.
 * @returns The parsed JSON object or an object with an error property.
 */
export function safeJsonParser(value: string): unknown {
  return JSON.parse(value, typeReviver);
}

export interface stringifyOptions {
  bufferEncoding: 'base64' | 'hex' | 'none';
}

const defaultOptions: stringifyOptions = {
  bufferEncoding: 'base64',
};

function isBufferValue(toStr: unknown, val: Record<string, unknown>): boolean {
  return (
    toStr === '[object Object]' &&
    objKeys(val).length === 2 &&
    objKeys(val).includes('type') &&
    val['type'] === 'Buffer'
  );
}

/**
 * Converts a value to its string representation.
 *
 * @param val - The value to be converted.
 * @param isArrayProp - Indicates whether the value is a property of an array.
 * @param options - The options for stringify (optional, default is `defaultStringifierOptions`).
 * @returns The string representation of the value, or `null` or `undefined` if the value cannot be stringified.
 */
function stringifyHelper(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  val: any,
  isArrayProp: boolean,
  options: stringifyOptions = defaultOptions
): string | null | undefined {
  if (options === null) options = defaultOptions;
  let i, max, str, keys, key, propVal, toStr;
  if (val === true) {
    return 'true';
  }
  if (val === false) {
    return 'false';
  }
  switch (typeof val) {
    case 'object':
      if (val === null) {
        return null;
      } else if ('toJSON' in val && typeof val.toJSON === 'function') {
        return stringifyHelper(val.toJSON(), isArrayProp, options);
      } else {
        toStr = objToString.call(val);
        if (toStr === '[object Array]') {
          str = '[';
          max = (val as unknown[]).length - 1;
          for (i = 0; i < max; i++) {
            str += stringifyHelper((val as unknown[])[i], true) + ',';
          }
          if (max > -1) {
            str += stringifyHelper((val as unknown[])[i], true);
          }
          return str + ']';
        } else if (
          options.bufferEncoding !== 'none' &&
          isBufferValue(toStr, val as Record<string, unknown>)
        ) {
          switch (options.bufferEncoding) {
            case 'base64':
              return JSON.stringify({
                data: Buffer.from(val['data']).toString('base64'),
                dataType: 'bh',
              });
            case 'hex':
              return JSON.stringify({
                data: Buffer.from(val['data']).toString(),
                dataType: 'bh',
              });
          }
        } else if (toStr === '[object Object]') {
          keys = objKeys(val).sort();
          max = keys.length;
          str = '';
          i = 0;
          while (i < max) {
            key = keys[i];
            propVal = stringifyHelper(
              (val as Record<typeof key, unknown>)[key],
              false,
              options
            );
            if (propVal !== undefined) {
              if (str) {
                str += ',';
              }
              str += JSON.stringify(key) + ':' + propVal;
            }
            i++;
          }
          return '{' + str + '}';
        } else {
          return JSON.stringify(val);
        }
      }
    // eslint-disable-next-line no-fallthrough
    case 'function':
    case 'undefined':
      return isArrayProp ? null : undefined;
    case 'string':
      return JSON.stringify(val);
    case 'bigint':
      return JSON.stringify({dataType: 'bi', value: val.toString(16)});
    default:
      return isFinite(val as number) ? val : null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getBufferFromField(input: any, encoding?: 'base64' | 'hex'): Buffer {
  switch (encoding) {
    case 'base64':
      return Buffer.from(input.data, 'base64');
    default:
      return Buffer.from(input);
  }
}

/**
 * Revives specific types during JSON parsing.
 *
 * @param key - The key of the current property being parsed.
 * @param value - The value of the current property being parsed.
 * @returns The revived value, or the original value if no revival is needed.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function typeReviver(key: string, value: any): any {
  if (key === 'sig') return value;
  const originalObject = value;
  if (
    isObject(originalObject) &&
    Object.prototype.hasOwnProperty.call(originalObject, 'dataType') &&
    originalObject.dataType
  ) {
    if (originalObject.dataType === 'bh') {
      return new Uint8Array(getBufferFromField(originalObject, 'base64'));
    } else if (originalObject.dataType === 'bi') {
      // eslint-disable-next-line node/no-unsupported-features/es-builtins
      return BigInt('0x' + value);
    }
  } else {
    return value;
  }
}
