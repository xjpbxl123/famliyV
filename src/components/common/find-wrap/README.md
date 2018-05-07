# Find-wrap

```
## props
*title {type:String}
模块标题
*activePage {type:Number}
当前第几页
*sumPage {type:Number}
总页数
*pagination {type:Boolean}
是否显示分页器
```

## example

<find-wrap title="教材系列" :activePage="materialPage" :sumPage="materialList.sumPage" :pagination="pagination">
      <li><li/>
      <li><li/>
</find-wrap>

##Tests
You can view `src/components/material`

## tips

1.此组件是 slot 内容分发。
2.slide 切换是 scroll 值在更改

###author
胡建伟
