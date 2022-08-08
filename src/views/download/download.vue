<template>
  <div class="download-wrap">
    <div class="page-title fontSize34">{{ $t('download.info') }}</div>
    <div class="exportname">
      {{
        exportname == 'node' ? $t('nodeInfo.node') : $t('contract.address')
      }}&nbsp;#&nbsp;{{ address }}
    </div>
    <p class="download-msg">
      {{
        exportname == 'node'
          ? $t('download.downloadNodeMsg')
          : $t('download.downloadAddressMsg')
      }}
    </p>
    <div class="download">
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        label-width="100px"
        :rules="rules"
      >
        <!-- 谷歌机器人验证地方 -->
        <!-- <div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"  data-callback="robotVerified"></div> -->
        <com-recaptcha ref="recaptcha" @verify="verify"></com-recaptcha>
        <span class="tip">{{ $t('download.dataDate') }}</span>
        <div class="mdate-picker" @click="showDateSelect"><i class="el-input__icon el-icon-date"></i>{{ form.value }}</div>
        <el-date-picker
          v-model="form.value"
          type="date"
          :placeholder="$t('download.placeholder')"
          :picker-options="pickerOptions"
          class="select-date"
          popper-class="mdate-picker-popper"
          value-format="yyyy-MM-dd"
          ref="datepick"
          @blur="datePickClose"
        >
        </el-date-picker>
        <span class="tip">{{ $t('download.today') }}</span>
      </el-form>
      <el-button
        type="primary"
        class="el-btn el-download"
        @click="downloadFn"
        :disabled="disabledBtn"
        >{{ $t('download.download') }}</el-button
      >
      <!-- <el-button type="primary" class="el-btn el-download" @click='downloadFn'>{{$t('download.download')}}</el-button> -->
      <p class="most-downloads">{{ $t('download.mostDownloads') }}</p>
    </div>
  </div>
</template>
<script>
import comRecaptcha from '@/components/recaptcha/recaptcha';
import apiService from '@/services/API-services';
import apiConfig from '@/config/API-config';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  //组件名
  name: '',
  //实例的数据对象
  data() {
    return {
      param: {},
      tab: 0,
      src: '',
      disabledBtn: false,
      address: '',
      form: {
        value: new Date().getFullYear() - 1 + '-01-01', //"2019-01-01"
      },
      pickerOptions: {
        disabledDate(time) {
          let myDate = new Date();
          // console.warn("myDate.getFullYear()",myDate.getFullYear())
          let val = myDate.setFullYear(myDate.getFullYear(), 0, 1);
          return time.getTime() > Date.now(); //time.getTime() < new Date(val).getTime()- 8.64e7 ||
        },
      },
      description: '',
      descriptionProp: '',
      rules: {
        value: [
          {
            required: true,
            message: this.$t('download.placeholder1'),
            trigger: 'change',
          },
        ],
      },
      response: '',
      exportname: '',
      _isContract: false,
      response1: '',
      timeZone: '+8',
      tokenType: '',
    };
  },
  //数组或对象，用于接收来自父组件的数据
  props: {},
  //计算
  computed: {
    ...mapGetters(['chainId', 'googleApi']),
    lang() {
      return this.$i18n.locale.indexOf('zh') !== -1 ? 'zh-cn' : 'en';
    },
  },
  //方法
  methods: {
    ...mapActions(['updateApiStatus']),
    showDateSelect() {
      document.body.style.overflow = 'hidden';
      this.$refs.datepick.showPicker()
    },
    datePickClose() {
      document.body.style.overflow = 'unset';
    },
    verify(data) {
      console.warn('传给父组件的token', data);
      this.response = data;
      // 测试环境特殊处理
      if (location.origin.indexOf('https') == -1) {
        this.response = '1';
      }
      if (this.response) {
        // this.disabledBtn=false;
        this.sameFn();
      } else {
        // this.$message.error(this.$t('download.robot'));
      }
      // this.response ? this.sameFn() : this.$message.error(this.$t('download.robot'))
    },
    downloadFn() {
      //父组件调用子组件方法
      this.$refs.recaptcha.getResponse();
      // this.sameFn();
    },
    sameFn() {
      this.param = {
        // cid:this.chainId,
        // address:this.address,
        date: new Date(this.form.value).getTime(),
      };
      this.param.address = this.address;
      if (this.exportname == 'account') {
        this.src =
          apiConfig.TRADE.addressTransactionDownload +
          '?date=' +
          this.param.date +
          '&address=' +
          this.param.address +
          '&local=' +
          this.lang +
          '&timeZone=' +
          this.timeZone;
      } else if (this.exportname == 'contract') {
        this.src = apiService.encodeParams(
          apiConfig.TRADE.contractDownload,
          this.param
        );
      } else if (this.exportname == 'node') {
        this.param.nodeId = this.address;
        this.src =
          apiConfig.BLOCK.blockListByNodeIdDownload +
          '?date=' +
          this.param.date +
          '&nodeId=' +
          this.param.nodeId +
          '&local=' +
          this.lang +
          '&timeZone=' +
          this.timeZone;
      } else if (this.exportname === 'tokenHolderList') {
        this.src =
          apiConfig.TOKEN.exportTokenHolderList +
          '?contract=' +
          this.param.address +
          '&ercType=' +
          this.tokenType +
          '&local=' +
          this.lang +
          '&timeZone=' +
          this.timeZone +
          '&token=' +
          this.response;
      } else if (this.exportname === 'holderTokenList') {
        this.src =
          apiConfig.TOKEN.exportHolderTokenList +
          '?address=' +
          this.param.address +
          '&type=' +
          this.tokenType +
          '&local=' +
          this.lang +
          '&timeZone=' +
          this.timeZone +
          '&token=' +
          this.response;
      } else if (this.exportname === 'TokenTransferList') {
        // token 交易列表导出
        const preUrlMap = {
          erc20: apiConfig.TOKEN.exportT20TxList, 
          erc721: apiConfig.TOKEN.exportT721TxList, 
          erc721Id: apiConfig.TOKEN.exportT721TxList, 
          erc1155: apiConfig.TOKEN.exportT1155TxList, 
          erc1155Id: apiConfig.TOKEN.exportT1155TxList, 
        }
        let adr = this._isContract ? 'contract' : 'address';
        this.src =
          preUrlMap[this.tokenType] +
          '?date=' +
          this.param.date +
          '&' + adr + '=' +
          this.param.address +
          '&local=' +
          this.lang +
          '&timeZone=' +
          this.timeZone +
          '&token=' +
          this.response;
        if (this.tokenType === 'erc721Id' || this.tokenType === 'erc1155Id') {
          this.src += '&tokenId=' + this.$route.query.tokenId;
        }
      }
      console.log(this.src);
      window.open(this.src);
    },
  },
  //生命周期函数
  created() {
    this.address = this.$route.query.address;
    this.exportname = this.$route.query.exportname;
    this.tokenType = this.$route.query.tokenType;
    this._isContract = this.$route.query.contract === 'true';
    const num = -new Date().getTimezoneOffset();
    this.timeZone = num / 60;
    if (num > 0) {
      this.timeZone = encodeURIComponent('+') + this.timeZone;
    } else if (num < 0) {
      this.timeZone = encodeURIComponent('-') + this.timeZone;
    } else {
      this.timeZone = 0;
    }
  },
  mounted() {
    // setTimeout(() => {
    //     this.$nextTick(()=>{
    //         if(document.getElementById('message').innerText){
    //             // console.log(111)
    //             this.disabledBtn=false;
    //         }else{
    //             this.disabledBtn=true;
    //             this.$message.error(this.$t('menu.goole'))
    //         }
    //     })
    // }, 300);
    this.disabledBtn = !this.googleApi;
  },
  //组件
  components: {
    comRecaptcha,
  },
  watch: {
    googleApi: function () {
      this.disabledBtn = !this.googleApi;
    },
  },
};
</script>
<style lang="less" scoped>
.margin20 {
  margin-right: 20px;
}
.tip {
  font-size: 14px;
  color: #666666;
}
.exportname {
  margin: 22px 0;
  font-size: 20px;
  color: #333333;
  word-break: break-all;
}
.download-msg {
  font-size: 14px;
  color: #666666;
}
.select-date {
  margin: 20px 9px;
  width: 130px;
}
.most-downloads {
  font-size: 12px;
  color: #999999;
  margin-top: 14px;
}
.mdate-picker {
  display: none;
  margin: 20px 9px;
  padding: 0 30px 0 5px;
  width: 130px;
  font-family: Arial;
  font-size: 12px;
  font-weight: 400px;
  color: #aaaaaa;
  height: 34px;
  line-height: 34px;
  border: 1px solid #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
}
@media (max-width: 750px) {
  .select-date {
    margin: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }
  .mdate-picker {
    display: inline-block;
  }
}
</style>
<style lang="less">
.download {
  .el-form--inline .el-form-item__label {
    font-size: 14px;
    color: #fff;
    text-align: left;
  }
  .el-input--prefix .el-input__inner {
    height: 34px;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
    font-size: 12px;
    color: #aaaaaa;
  }
  .el-input__icon {
    line-height: 35px;
  }
  .el-popper {
    background: #fff;
  }
  .el-button--primary {
    width: 91px;
    height: 38px;
    background-color: #0798de;
    padding: 7px 12px;
    &.is-disabled {
      border: none;
    }
  }
  .el-button.el-button--primary:focus {
    background-color: #0798de;
  }
}
#script-area {
  margin-top: 20px;
}
@media (max-width: 750px) {
  .mdate-picker-popper{
    z-index: 10000 !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    .popper__arrow {
      display: none;
    }
  }
}
</style>
