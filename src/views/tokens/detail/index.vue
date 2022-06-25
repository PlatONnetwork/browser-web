<template>
  <component :is="componentName" :tokens-detail="componentData" :address="address"></component>
</template>

<script>
import apiService from '@/services/API-services';
import erc20DetailComponent from "@/views/tokens/detail/erc20-detail.vue";
import erc721DetailComponent from "@/views/tokens/detail/erc721-detail.vue";
import erc721IdDetailComponent from "@/views/tokens/detail/erc721id-detail.vue";
import erc1155DetailComponent from '@/views/tokens/detail/erc1155-detail.vue'
import erc1155IdDetailComponent from '@/views/tokens/detail/erc1155id-detail.vue'
import AdrTrans from '@/mixins/adrTrans';
const componentMap = {
    erc20: 'erc20DetailComponent',
    erc721: 'erc721DetailComponent',
    erc721Id: 'erc721IdDetailComponent',
    erc1155: 'erc1155DetailComponent',
    erc1155Id: 'erc1155IdDetailComponent'
}
export default {
  mixins: [AdrTrans],
  data() {
    return {
      type: '',
      address: '',
      componentData: null
    }
  },
  computed: {
    componentName() {
      return componentMap[this.type]
    }
  },
  components: {
    erc20DetailComponent,
    erc721DetailComponent,
    erc721IdDetailComponent,
    erc1155DetailComponent,
    erc1155IdDetailComponent
  },
  created() {
    this.checkAdr()
    this.tokenId = this.$route.query.id;
    let type = this.$route.query.type;
    if (type) {
      this.type = type;
    } else {
      this.getDetail();
    }
  },
  methods: {
    //获取地址信息详情
    getDetail() {
      let param = {
        address: this.address,
      };
      apiService.tokens
        .tokenDetail(param)
        .then((res) => {
          let { errMsg, code, data } = res;
          if (code == 0) {
            if (data.type === 'erc20') {
              this.type = 'erc20';
            } else if (data.type === 'erc721') {
              this.type = this.tokenId ? 'erc721Id' : 'erc721';
            } else if (data.type === 'erc1155') {
              this.type = this.tokenId ? 'erc1155Id' : 'erc1155';
            }
            this.componentData = data;
          } else {
            this.$message.error(errMsg);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
  }
}
</script>
