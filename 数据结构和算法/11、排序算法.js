function ArrayList () {
    this.array = []
    this.insert = function (ele) {
        this.array.push(ele)
    }
    this.toString = function () {
        return this.array.join('')
    }
    // 冒泡排序（循环两次）
    // 遍历两次：遍历所有的数据。每次对两两数据进行比较。按照规则大小进行置换。
    this.bubbleSort = function () {
        let array = this.array
        let length = array.length
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if(array[j] > array[j+1]) {
                    // 变量接收
                    // let temp = array[j]
					// array[j] = array[j+1]
                    // array[j+1] = temp

                    // 解构赋值
                    [array[j], array[j+1]] = [array[j+1], array[j]]
                }
            }
        }
    }
    // 选择排序（循环两次）
    // 外层循环一次：内层循环与外层循环的值进行对比。找出最大值或最小值。
    this.selectionSort = function () {
        let minA = null
        let array = this.array
        let length = array.length
        for (let i = 0; i < length; i++) {
            minA = array[i]
            for (let j = i; j < length - 1; j++) {
                if(minA > array[j+1]){
                    minA = array[j+1]
                }
            }
            let index = array.indexOf(minA)
            console.log(minA, index)
            var prev = array[i]
            array[i] = minA
            array[index] = prev
            // [array[i], array[index]] = [minA, array[i]]
        }
    }
    // 插入排序
    this.insertSort = function () {
        let array = this.array
        let length = array.length
        let temp = null
        let j = null
        for (let i = 0; i < length; i++) {
            j = i
            temp = array[i]
            while (j > 0 && array[j - 1] > temp) {
                array[j] = array[j - 1]
                j--
            }
            array[j] = temp
        }
    }

    // 归并排序(将数组分割对半分，直到分到单个数组为止，每两个数组比较后放入新的数组。)分治法

    this.merge = function () {
        sliceArray(this.array)
    }
    // 快速排序（先划分（2、3、4 称为划分操作）---> 分治5）
    // 1、先找数组中的任意一项作为基准元素pivot
    // 2、创建两个指针。左边指向数组的第一个项，右边指向数组的最后一项。
    // 3、移动左指针直到找到一个基准元素大的值（找到后停止，右指针动），接着移动右指针，直到右指针找到比基准元素小的值。左右指针的值对换（swap）。
    // 4、接着走第三步。直到左右指针相等。停止。
    // 5、接着，算法对划分后的小数组（基准元素两侧的数组。）进行2、3、4操作。
    this.quick = function () {
        this.hfOperat(this.array, 0, this.array.length - 1)
    }
    this.hfOperat = function (array, left, right) {
        let index
        if (left < right) {
            index = this.unilateral(array, left, right)
            this.hfOperat(array, left, index - 1)
            this.hfOperat(array, index + 1, right)
        }
    }
    this.quickSort = function (array, left, right) {
        let pivot = array[Math.ceil(array.length/2)]
        while(left < right) {
            while(array[left] <= pivot && left < right){
                left++
            }
            while(array[right] >= pivot && left < right){
                right--
            }
            if(left < right) {
                let rightcount = array[right]
                array[right] = array[left]
                array[left] = rightcount
            }
        }
        // 这一步比较重要，需要left=right时。与pivot在数组中的位置做交换
        array[Math.ceil(array.length/2)] = array[left]
        array[left] = pivot
        return left
    }
    // 单边循环法

    // 选中基准元素pivot
    // 选中mark指针指向数列起始位置 （mark指针代表小于基准元素的区域边界）
    // 如果遍历到的元素大于基准元素，就继续往后遍历
    // 如果遍历到的元素小于基准元素。需要做两步：
    // 1、把mark指针右移1位，因为小于pivot的区域边界增大了1；
    // 2、让最新遍历到的元素和mark指针所在位置的元素交换位置，因为最新遍历的元素归属于小于pivot的区域。
    this.unilateral = function (array, left, right) {
        let pivot = array[left]
        let mark = left
        for (var i = left; i <= right; i++) {
            if (array[i] < pivot) {
                mark++
                let text = array[mark]
                array[mark] = array[i]
                array[i] = text
            }
        }

        var markT = array[mark]
        array[mark] = array[left]
        array[left] = markT
        return mark
    }
}
function sliceArray (array) {
    let length = array.length
    if (length === 1) return array
    var mid = Math.floor(length / 2)
    var lArray = array.slice(0, mid)
    var rArray = array.slice(mid, length)
    console.log("====",lArray, rArray)
    return mergeSort(sliceArray(lArray), sliceArray(rArray))
}
// 这里相当于合并两个有序数组
function mergeSort (lArray, rArray) {
    let result = []
    let li = 0
    let ri = 0
    while(li < lArray.length && ri < rArray.length) {
        if(lArray[li] < rArray[ri]) {
            result.push(lArray[li])
            li ++
        } else {
            result.push(rArray[ri])
            ri ++
        }
    }
    while (li < lArray.length) {
        result.push(lArray[li])
        li++
    }
    while (ri < rArray.length) {
        result.push(rArray[ri])
        ri++
    }
    console.log("!!!!",result)
    return result
}
var list = new ArrayList()
list.insert(5)
list.insert(3)
list.insert(4)
list.insert(7)
list.insert(2)
list.insert(8)
list.insert(6)
list.insert(9)
list.insert(1)
// list.bubbleSort()
// list.selectionSort()
// list.insertSort()
// list.merge()
list.quick()
console.log(list.array)
