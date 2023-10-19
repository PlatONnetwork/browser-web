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