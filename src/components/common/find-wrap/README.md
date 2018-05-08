# Find-wrap

外套

## import

```
import findWrap from 'components/common/find-wrap/find-wrap'
```

## example

     <find-wrap title="教材系列" :activePage="1" :sumPage="5" :pagination="true">
            <li><li/>
            <li><li/>
      </find-wrap>

## props

<table>
    <tr>
        <td>参数</td>
        <td>说明</td>
        <td>类型</td>
        <td>可选值</td>
        <td>默认值</td>
    </tr>
    <tr>
        <td>title</td>
        <td>模块标题</td>
        <td>String</td>
        <td></td>
        <td>Find</td>
    </tr>
    <tr>
        <td>activePage</td>
        <td>当前第几页</td>
        <td>Number</td>
        <td></td>
        <td>1</td>
    </tr>
    <tr>
        <td>sumPage</td>
        <td>总页数</td>
        <td>Number</td>
        <td></td>
        <td>1</td>
    </tr>
     <tr>
         <td>pagination</td>
         <td>是否显示分页器</td>
         <td>Boolean</td>
         <td></td>
         <td>true</td>
     </tr>
</table>

## tips

1.此组件是 slot 内容分发。

2.slide 切换是 scroll 值在更改

###author

胡建伟
