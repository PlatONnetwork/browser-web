import Vue from 'vue'

export default Vue.directive('nodeMove',{
    bind(el, binding, vnode){    

    },
    inserted(el, binding, vnode){
        
    },
    componentUpdated(el, binding, vnode){
        if(binding.value){
            // const height = el.clientHeight;
            el.style.transform = 'translate(0,-2075)';
        }
    }
})