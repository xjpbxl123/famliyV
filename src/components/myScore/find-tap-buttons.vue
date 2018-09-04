<template>
    <div class="bottom" >
        <button class="eachButton" v-for="(item,index) in tapButtons" :class="[item.className,{'active': myScoreTapIndex === index}]" :key="index" @click="setTapSelect(index)" >
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
      }
    },
    data () {
      return {
        tapButtons: [
          {
            className: 'localSource key-39',
            text: '本地资源'
          },
          {
            className: 'myCollect key-42',
            text: '我的收藏'
          },
          {
            className: 'myRecord key-46',
            text: '我的录音'
          },
          {
            className: 'myPlay key-49',
            text: '我的弹奏'
          },
          {
            className: 'recentOpen key-54',
            text: '最近打开'
          }
        ]
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
      transform: translateX(100%);
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
      transform: translateX(80%);
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
      transform: translateX(-8%);
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
