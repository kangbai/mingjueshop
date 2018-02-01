<template>
  <div class="step">
    <span @click="handleChange('minus')">-</span>
    <input type="number" :value="currentVal" @input="handleInput" />
    <span @click="handleChange('add')">+</span>
  </div>
</template>

<script>
  export default {
    props: {
      from: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: 1
      },
      onInputChange: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        currentVal: this.from
      }
    },
    methods: {
      handleInput (e) {
        this.currentVal = e.target.value;
        this.onInputChange(this.currentVal);
      },
      handleChange (type) {
        if (type == 'add') {
          if (this.currentVal == this.max) return;
          this.currentVal += 1;
        } else {
          if (this.currentVal == this.min) return;
          this.currentVal -= 1;
        }
        this.onInputChange(this.currentVal);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';
  .step {
    display: inline-block;
    border: 1px solid #C4C4C4;
    box-sizing: content-box;
    font-size: 0;
  }
  .step span {
    display: inline-block;
    width: px2rem(30);
    line-height: px2rem(30);
    text-align: center;
    background: #EDEDED;
    font-size: px2rem(15);
  }
  .step input {
    padding: 0 px2rem(2);
    width: px2rem(42);
    line-height: px2rem(30);
    text-align: center;
    border-left: 1px solid #C4C4C4;
    border-right: 1px solid #C4C4C4;
    font-size: px2rem(18);
  }
</style>
