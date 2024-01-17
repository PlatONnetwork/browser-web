import { Message } from 'element-ui';
import { i18n } from '@/main'

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


