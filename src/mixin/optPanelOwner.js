export default {
  data: {
    time: 0,
    amount: null,
    remark: null, 
    type: '配方奶'
  },
  methods: {
    updateAmount(value) {
      this.amount = value;
    },
    updateRemark(value) {
      this.remark = value;
    },
    updateTime(value) {
      this.time = value;
    },
    updateType(value) {
      this.type = value;
    },
  }
}