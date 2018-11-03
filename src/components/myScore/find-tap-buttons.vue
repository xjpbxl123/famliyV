<template>
    <div class="bottom" >
        <button class="eachButton" v-for="(item,index) in tapButton" :class="[item.className,{'active': myScoreTapIndex === index}]" :key="index" @click="setTapSelect(index)">
            <span class="line" v-show="myScoreTapIndex === index"></span>
        </button>
    </div>

</template>
<script type="text/javascript">
  export default {
    props: {
      myScoreTapIndex: {
        type: Number,
        default: () => 0
      },
      setTapSelect: {
        type: Function
      },
      tapButton: {
        type: Array
      }
    },
    data () {
      return {
      }
    },
    methods: {},
    components: {}
  }
</script>
<style lang="scss" scoped>
.bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
  z-index: 100;
  .eachButton {
    position: absolute;
    bottom: 10px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    background: transparent;
  }
  .line {
    position: absolute;
    width: 100px;
    height: 1px;
    background-color: #fff;
    left: -90px;
    transform: translateX(86%);
    bottom: 36px;
  }
  .usb::before {
    position: absolute;
    bottom: 5px;
    content: "USB存储";
    width: 182px;
    height: 100px;
    left: -148px;
    background: url("./images/btn_page_nor.png");
    background-size: cover;
    opacity: 0.8;
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 100px;
  }
  .usb {
    .line {
      transform: translateX(-15%);
    }
  }
  .localSource::before {
    position: absolute;
    bottom: 5px;
    content: "本地资源";
    width: 182px;
    height: 100px;
    left: -44px;
    background: url("./images/btn_page_nor.png");
    background-size: cover;
    opacity: 0.8;
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 100px;
  }
  .myCollect {
    .line {
      transform: translateX(105%);
    }
  }
  .myCollect::before {
    position: absolute;
    bottom: 5px;
    content: "我的收藏";
    width: 182px;
    height: 100px;
    left: -26px;
    background: url("./images/btn_page_nor.png");
    background-size: cover;
    opacity: 0.8;
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 100px;
  }
  .myRecord {
    .line {
      transform: translateX(70%);
    }
  }
  .myRecord::before {
    position: absolute;
    bottom: 5px;
    content: "我的录音";
    width: 182px;
    height: 100px;
    left: -55px;
    background: url("./images/btn_page_nor.png");
    background-size: cover;
    opacity: 0.8;
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 100px;
  }
  .myPlay {
    .line {
      transform: translateX(86%);
    }
  }
  .myPlay::before {
    position: absolute;
    bottom: 5px;
    content: "我的弹奏";
    width: 182px;
    height: 100px;
    left: -44px;
    background: url("./images/btn_page_nor.png");
    background-size: cover;
    opacity: 0.8;
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 100px;
  }
  .recentOpen {
    .line {
      transform: translateX(0);
    }
  }
  .recentOpen::before {
    position: absolute;
    bottom: 5px;
    content: "最近打开";
    width: 182px;
    height: 100px;
    left: -130px;
    background: url("./images/btn_page_nor.png");
    background-size: cover;
    opacity: 0.8;
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 100px;
  }
  .eachButton.active::before {
    background: url("./images/btn_page_down.png");
    background-size: cover;
  }
}
</style>
