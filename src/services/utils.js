import { Message } from 'element-ui';
import { i18n } from '@/main'
const utf8 = require('utf8');

const formatDecimal = function (num, decimal) {
  num = num.toString();
  var index = num.indexOf(".");
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1);
  } else {
    num = num.substring(0);
  }
  return parseFloat(num).toFixed(decimal);
};

export { formatDecimal };


export const copyFn = (content) => {
  if (!content) return
  if (navigator.clipboard) {
    navigator.clipboard.writeText(content)
    Message.success(i18n.t('modalInfo.copysuccess'))
  } else {
    let textArea = document.createElement('textarea')
    textArea.value = content
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    Message.success(i18n.t('modalInfo.copysuccess'))
  }
}

export const getAddress = (str) => {
  if (str) {
    return str.substring(0, 6) + `...` + str.substring(str.length - 4, str.length)
  }
  return str
}


export const hexToUTF8 = (hexString) => {
  if (hexString.indexOf('0x') === 0) {
    hexString = hexString.slice(2);
  }

  const bytes = new Uint8Array(hexString.length / 2);

  for (let index = 0; index < bytes.length; index++) {
    const start = index * 2;
    const hexByte = hexString.slice(start, start + 2);
    const byte = Number.parseInt(hexByte, 16);
    if (Number.isNaN(byte) || byte < 0)
      throw new Error(
        `Invalid byte sequence ("${hexByte}" in "${hexString}").`
      );
    bytes[ index ] = byte;
  }

  let result = new TextDecoder().decode(bytes);
  return result.replace(/\0/g, '');
}
/**
 * Check if string is HEX, requires a 0x in front
 *
 * @method isHexStrict
 * @param {String} hex to be checked
 * @returns {Boolean}
 */
var isHexStrict = function (hex) {
  return ((typeof hex === 'string' || typeof hex === 'number') && /^(-)?0x[0-9a-f]*$/i.test(hex));
};
/**
 * Should be called to get utf8 from it's hex representation
 *
 * @method hexToUtf8
 * @param {String} hex
 * @returns {String} ascii string representation of hex value
 */
export const testHexToUtf8 = (hex) => {
  if (!isHexStrict(hex))
    throw new Error('The parameter "' + hex + '" must be a valid HEX string.');

  var str = "";
  var code = 0;
  hex = hex.replace(/^0x/i, '');

  // remove 00 padding from either side
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split("").reverse().join("");
  hex = hex.replace(/^(?:00)*/, '');
  hex = hex.split("").reverse().join("");

  var l = hex.length;

  for (var i = 0; i < l; i += 2) {
    code = parseInt(hex.slice(i, i + 2), 16);
    // if (code !== 0) {
    str += String.fromCharCode(code);
    // }
  }

  return utf8.decode(str);
};
