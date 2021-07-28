import Vue from 'vue';

const nodeMove = Vue.directive('nodeMove', {
  bind(el, binding, vnode) {},
  inserted(el, binding, vnode) {},
  componentUpdated(el, binding, vnode) {
    if (binding.value) {
      // const height = el.clientHeight;
      el.style.transform = 'translate(0,-2075)';
    }
  }
});

function createPreviewBox() {
  let close = () => {
    document.body.style.overflow = 'unset';
    box.style.visibility = 'hidden';
  };
  // 遮罩
  const box = document.createElement('div');
  box.className = 'pic-preview-mask';
  box.addEventListener('click', close);
  // 关闭图标
  const icon = document.createElement('i');
  icon.className = 'el-icon-close';
  const iconWrapper = document.createElement('span');
  iconWrapper.className = 'pic-preview__btn pic-preview__close';
  iconWrapper.appendChild(icon);
  box.appendChild(iconWrapper);
  iconWrapper.addEventListener('click', close);
  // 图片
  const img = document.createElement('img');
  img.className = 'pic-preview__main';
  // img.style = 'max-height: 100%;max-width: 100%;';
  img.addEventListener('click', e => {
    e.stopPropagation();
  });
  box.appendChild(img);

  // 挂载
  document.body.appendChild(box);
  return box;
}

const picPreview = Vue.directive('picPreview', {
  bind(el, binding, vnode) {
    el.addEventListener('click', () => {
      let box =
        document.querySelector('.pic-preview-mask') || createPreviewBox();
      box.querySelector('img').src = el.src;
      // 处理滚动条
      document.body.style.overflow = 'hidden';
      // 显示
      box.style.visibility = 'visible';
    });
  }
});

const mousescroll = Vue.directive('mousescroll', {
  bind(el) {
    let isActive = false;
    const open = () => {
      isActive = true;
      el.style.cursor = 'move';
    }
    const close = () => {
      isActive = false;
      el.style.cursor = 'default';
    }
    el.addEventListener('mousedown', () => {
      open();
    });
    el.addEventListener('mousemove', (e) => {
      if (isActive) {
        el.scrollBy(-e.movementX, -e.movementY)
      }
    });
    el.addEventListener('mouseleave', () => {
      isActive && close()
    });
    el.addEventListener('mouseup', () => {
      close();
    });
  }
});

export default { nodeMove, picPreview, mousescroll };
