#### flex总结

虽然平常用的比较多，但是只是对常见的属性比较熟悉。没有完整的去总结flex的知识点。（主要参考阮一峰的flex文章。）

flex是flexible box（弹性布局）的简称。

使用弹性布局之后，子元素的float、clear、vertical-align属性将失效

```
1、flex容器

使容器变成flex容器的属性有两种：flex和inline-flex

flex容器默认有两条轴线：水平的主轴（main axis）和 垂直的交叉轴(cross axis)

flex容器默认是沿主轴排列

display: flex
dispaley: inline-flex

属性都能让容器变成flex容器：
相同点：都能让子元素成一个弹性盒子
不同点：一个是块级。默认宽度100%，一个是行内块级元素，宽高默认和子元素的宽高一致
```
[详情看这个例子](./../flex.html)

```
容器的属性

flex-direction 
flex-wrap
flex-flow
justify-content
align-items
align-content
```
```
flex-directiion属性
决定主轴的方法： 可选的值有row（默认）、row-reverse、column、column-reverse四个
row(默认): 主轴为水平方向，从左到右
row-reverse: 主轴为水平方向，从右到左
column: 主轴为垂直方向，从上到下
column-reverse: 主轴为垂直方向，从下到上
```
```
flex-wrap属性
定义子容器在容器内排列不下的时候，如何换行

flex-wrap:nowrap（默认）、wrap、wrap-reverse可选三个值
flex-wrap: nowrap: 不换行
flex-wrap: wrap:换行
flex-wrap: reverse-wap:换行。并且第一行在下面
```
```
flex-flow属性
flex-flow是flex-direction和flex-wrap的缩写
flex-flow：默认和row nowrap
flex-flow: <flex-direction||<flex-wrap>
flex-flow: row nowrap
```

```
justify-content属性
描述容器内的子元素的对齐方式。
justify-content: flex-start(默认)、flex-end、center、space-between、space-around

假设主轴是flex-direction: row.从左到右

justify-content: flex-start(默认) // 左对齐
justify-content: flex-end // 右对齐
justify-content: flex-center // 中间对齐
justify-content: space-between // 两端对齐 子容器之间的间隔都相等
justify-content: space-around // 子容器之间的左右间距相同
```
```
align-items属性

align-items定义交叉轴上的对齐方式

align-items: flex-start(默认)、flex-end、center、baseline（基准线）、stretch(伸展)

align-items: flex-start(默认)交叉轴起点对齐
align-items: flex-end; 交叉轴终点对齐
align-items: center; 交叉轴的中点对齐
align-items: baseline; 子容器的第一行文字的基线对齐
align-items: stretch; 如果子容器没有设置高度或者为auto.则子容器占满整个容器的高度
```
```
align-content属性

定义了多行（多根轴线，就是换行）的对齐方式（如果只有一根轴线，则不生效）

align-content: flex-start(默认)、flex-end、center、space-between、space-round、stretch

flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。
```

#### 子容器的属性（order、flex-grow、flex-shrink、flex-basis、flex、align-self）
```
order属性

order:<integer(整数)>

order属性的值。定义了子容器的排列顺序，数值越小，越在前面
```
```
flex-grow属性(伸、放大)
flex-grow: <number(默认为0)>

flex-grow属性定义了子容器的放大比例。默认为0，即如果存在剩余空间，也不放大

如果只有一个子容器设置为1，则这个子容器则占满剩余的部分
如果给每个子容器都设置了这个值1。则子容器平分整个容器的空间。
```
```
flex-shrink属性(缩、缩小)

flex-shrink: <number(默认为1)>

flex-shrink属性定义了子容器的缩小比例。默认为1，即如果空间不足，该子容器也不会缩小

这个属性生效的前提是：flex 元素仅在默认宽度之和大于容器的时候才会发生收缩。其收缩的大小是依据 flex-shrink 的值。

```
```
flex-basis属性（基础）

flex-basis: <length|auto(默认)>

flex-basis属性定义了子容器的主轴空间是否有多余，如果右多余的容器，则设置对应的子容器长度或者宽度。
```

```
flex属性

flex是flex-grow，flex-shrink、flex-basis的简写。默认 0 1 auto。后两个属性可选。

flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
```

```
align-self属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```