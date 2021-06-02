/**
 * Created by 15236 on 2017/10/25.
 */
export const indexGetter = {
  blockStatisticData: state => state.blockStatisticData,
  blockData: state => state.blockData,
  chartData: state => state.chartData,
  ValidatorData: state => state.ValidatorData,
  ValidatorStatisticData: state => state.ValidatorStatisticData,
  isMove: state => state.isMove,
  isMove2: state => state.isMove2,
  barIsMove: state => state.barIsMove,
  isAddressDetailsDelegation: state => state.isAddressDetailsDelegation,
  isAddressDetailsReward: state => state.isAddressDetailsReward,
  configData: state => state.configData
};
