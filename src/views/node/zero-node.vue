

<template>
  <div class="history-node-wrap">
    <div class="page-title fontSize34">{{$t("nodeInfo.zeroProduceValidators").toUpperCase()}}</div>
    <Validator type="zero"></Validator>
  </div>
</template>
<script>
import Validator from './list'
export default {
  name: 'zero-node',
  data () {
    return {

    }
  },
  props: {

  },
  computed: {

  },
  watch: {

  },
  components: {
    Validator
  },
  methods: {

  },
  //生命周期函数
  created () {

  },
  mounted () {

  }
}
</script>
