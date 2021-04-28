// 斐波那契数列 1、1、2、3、5、8、13、21、34、55
// 1和2的斐波那契数是 1
// 第二项以上就是 前两项的数列之和
function fbnc (index) {
    if (index === 1 || index === 2) {
        return 1
    }
    return fbnc(index - 1) + fbnc(index - 2)
}
console.log(fbnc(10))

// 非递归实现
function fbnc1 (index) {
    var count = 0
    var n1 = 1
    var n2 = 1
    for (var i = 3; i <= index; i++) {
        count = n1 + n2
        n1 = n2
        n2 = count
    }
    return count
}
console.log(fbnc1(10))

// 动态规划
// 1、定义子问题
// 2、实现要反复执行而解决子问题的方法（这一步要参考前一节讨论的递归的步骤）
// 3、识别并求解出边界条件



// 贪心算法遵循一种近似解决问题的技术，期盼通过每个阶段的局部最优选择（当前最好的
// 解），从而达到全局的最优（全局最优解）。它不像动态规划那样计算更大的格局。