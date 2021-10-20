<template>
  <div
    :class="{
      'list-item': vertical === false,
      'list-col-item': vertical === true
    }"
  >
    <template v-if="label">
      <label v-if="vertical === false">{{
          label 
        }}：<el-tooltip v-if="tips" placement="bottom" class="item" effect="dark">
          <div slot="content" class="delegate-msg" v-html="tips">
          </div>
          <i class="address-icon"></i>
        </el-tooltip>
      </label>
      <label v-else> {{ label }}</label>
      
    </template>
    <p
      v-if="prop || prop == 0"
      :class="{
        red: type == 'fail',
        blue: type == 'link',
        green: type == 'success'
      }"
    >
      {{ prop }}
    </p>
    <slot name="tipHeader"> </slot>
    <slot></slot>
  </div>
</template>
<script>
import apiService from '@/services/API-services';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'list',
  data() {
    return {};
  },
  props: {
    prop: [String, Number],
    vertical: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'normal'
    },
    width: {
      type: String,
      default: '135'
    },
    inline: {
      type: Boolean,
      default: true
    },
    label: {
      type: String,
      default: ""
    },
    tips: {
      type: String,
      default: ""
    }
  },
  computed: {},
  watch: {},
  components: {},
  methods: {
    // goDetail(){
    //     if(this.type=='link'){
    //         this.$emit('')
    //     }
    // }
  },
  //生命周期函数
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.list-item {
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 15px;
  label {
    font-size: 13px;
    color: #666;
    // line-height: 15px;
    width: auto;
    min-width: 169px;
    font-family: Gilroy-Medium;
  }
  p {
    word-break: break-all;
    width: 85%;
  }
  .blue:hover {
    color: #0e52ac;
  }
}
.list-col-item {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 15px;
  label {
    font-size: 13px;
    color: #666;
    line-height: 15px;
    font-family: Gilroy-Medium;
  }
  p {
    word-break: break-all;
    width: 85%;
  }
  .blue:hover {
    color: #0e52ac;
  }
}
</style>
<style lang="less">
.extra-data.list-item {
  margin-bottom: 10px;
  p {
    width: 474px;
    min-height: 86px;
    border: 1px solid #f5f5f5;
    word-break: break-all;
    border-radius: 1px;
    padding: 6px;
  }
}
.postscript.list-item {
  margin-bottom: 10px;
  p {
    width: 474px;
    border: 1px solid #f5f5f5;
    word-break: break-all;
    border-radius: 1px;
    padding: 6px;
  }
  .zero-block {
    width: auto !important;
  }
}
</style>
