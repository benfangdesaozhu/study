// 顺序搜索。
// 顺序和线性搜索时最基本的搜索算法，它的机制就是，循环数据结构中的元素和我们的搜索项作比较，
// 顺序搜索是最低效的一种搜索算法
function sequentialSearch (item, array) {
    for(let i = 0; i < array.length; i++) {
        if (item === array[i]) {
            return i
        }
    }
    return -1
}

// 二分搜索
// 二分搜索要遵循以下规则
// 1、已排序好的
// 2、选择数组的中间值
// 3、比较要搜索的和中间的值
// 4、搜索的值 > 中间的值。 中间的值到数组的length中间取值。在进行4步骤
// 5、搜索的值 < 中间的值。 数组的起始位置到中间的值 中间取值。在进行5步骤
// 6、一直执行4-5直到找到

function binarySearch (item, array) {
    let max = array.length
    let min = 0
    let mid = Math.floor(array.length/2)
    while(min <= max) {
        if (item - array[mid] > 0) {
            min = mid
            mid = mid + Math.floor((array.length - mid) / 2)
        } else if (item - array[mid] < 0) {
            max = mid
            mid = Math.floor(mid / 2)
        } else {
            return mid
        }
    }
    return -1
}
console.log(binarySearch(6, [1,2,3,4,5,6,7,8,9,10]))

// 广度优先搜索
// 又叫层级搜索，从上往下对每一层依次访问，在每一层中，从左往右或者从右往左访问节点，
// 访问完一层就进入下一层，直到没有节点可以访问为止。
function BFS(data) {
    let queue = data
    let result = []
    while(queue.length) {
        queue.forEach(ele => {
            result.push(ele)
        })
    }
}