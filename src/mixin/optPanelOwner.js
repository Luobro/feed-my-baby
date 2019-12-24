export default {
  data: {
    time: 0,
    amount: null,
    remark: null, 
    type: '配方奶'
  },
  methods: {
    updateAmount(value) {
      console.log('updateAmount', value);
      this.amount = value;
    },
    updateRemark(value) {
      console.log('updateRemark', value);
      this.remark = value;
    },
    updateTime(value) {
      console.log('updateTime', value);
      this.time = value;
    },
    updateType(value) {
      console.log('updateType', value);
      this.type = value;
    },
  }
}