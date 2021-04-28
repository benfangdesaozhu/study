// 请判断一个链表是否为回文链表。
// 示例 1:

// 输入: 1->2
// 输出: false
// 示例 2:
// 1 2 1
// 输入: 1->2->2->1
// 输出: true
// 进阶：
// 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    // 使用数组的双指针（头尾指针）
    // var headArr = []
    // while(head) {
    //     headArr.push(head)
    //     head = head.next
    // }
    // for(let i = 0; i < headArr.length; i++) {
    //     if(headArr[i].val !== headArr[headArr.length -1 -i].val) {
    //         return false
    //     }
    // }
    // return true

    // 获取中间的那个值
    function getMid(head){
        // 快慢指针
        var slow = head
        var fast = head
        while(fast.next && fast.next.next) {
            fast = fast.next.next
            slow = slow.next
        }
        return slow
    }
    // 旋转链表 中间之后的链表
    function resever(head){
        var cur = head
        var prev = null
        while(cur) {
            var temp = cur.next
            cur.next = prev
            prev = cur
            cur = temp 
        }
        return prev
    }

    function isPalindrome(head){
        if(!head) return true
        const firstEnd = getMid(head)

        const sendHalf = resever(firstEnd.next)
        let p1 = head
        var p2 = sendHalf
        var result = true
        while(result && p2) {
            if(p1.val !== p2.val) result = false
            p1 = p1.next
            p2 = p2.next
        }
        firstEnd.next = resever(sendHalf)
        return result
    }
};

// 给你两个有序整数数组 nums1 和 nums2，
// 请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
// 说明：

// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
//  

// 示例：

// 输入：
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// 输出：[1,2,2,3,5,6]
var merge = function(nums1, m, nums2, n) {
    var pos = m+n-1
    while(n >= 0 && m >= 0) {
        if(nums1[m] > nums2[n]) {
            nums1[pos--] = nums1[m--]
        } else {
            nums1[pos--] = nums2[n--]
        }
    }
    while(n > 0) {
        nums1[pos--] = nums2[n--]
    }
    return nums1
};
merge([1,2,3,0,0,0], 3, [2,5,6], 3)


// 给定一个字符串，逐个翻转字符串中的每个单词。

// 说明：

// 无空格字符构成一个 单词 。
// 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
// 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
//  

// 示例 1：

// 输入："the sky is blue"
// 输出："blue is sky the"

var reverseWords = function(s) {
    let left = 0
    let right = s.length - 1
    let arr = []
    let word = ''
    // 去空格
    while(s[left] === ' ') left++
    while(s[right] === ' ') right--
       
    // 遍历一遍字符串
    while(left <= right) {
        // 当遇到空格时。将当前拼接的字符串放入队列中
        if(s.charAt(left) === ' '&&word) {
            arr.unshift(word)
            word = ''
        } else if(s.charAt(left) !== ' ') { // 这个判断去除文字中多个空格问题
            word += s.charAt(left)
        }
        left++
    }
    arr.unshift(word)
    return arr.join(' ')
};