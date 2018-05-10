<template>
    <div class="starBox">
        <span v-if="starNum" class="differLever">LV.{{starNum}}</span>
        <div v-if="starNum" class="star-full" v-for="(num) in parseInt(starNum)" :key="num"></div>
        <div v-if="starNum" class="star-empty" v-for="(num) in parseInt(5-starNum)" :key="num+7"></div>
        <!-- <div v-if="!starNum" class="year">1970年代</div> -->
    </div>
</template>
<script type="text/javascript">
  import {
  } from 'vue-find'
  export default {
    name: 'popular-differ-list',
    props: {
      starNum: {
        type: Number,
        default: () => (0)
      }
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    created () {
    },
    components: {
    }
  }
</script>
<style lang="scss" scoped>

    .starBox {
        position: absolute;
        width: 404px;
        bottom: 34px;
        height: 31px;
        div {
            width: 31px;
            height: 31px;
            margin-right:20px;
            display: inline-block;
        }
        .star-full {
            background: url('./images/icon_star_blue.png') no-repeat;
            background-size: cover;
        }
        .star-empty {
            background: url('./images/icon_star_transparent.png') no-repeat;
            background-size: cover;
        }
        .differLever {
            display: inline-block;
            height: 100%;
            color: #334866;
            font-size: 28px;
            font-weight: 600;
            line-height: 31px;
            margin-left: 36px;
            transform: translateY(-5px);
            margin-right: 20px;
        }

    }
    .year {
        width: 100% !important;
        text-align: center;
        color: #fff;
        position: absolute;
        bottom: 5px;
        left: 0;
        font-size: 34px;
        font-weight: 600;
    }
</style>
