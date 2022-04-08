// var quickSort = function(nums) {
//     // 首页，检查数组的元素个数，如果小于等于1，就返回。
//     if (nums.length <= 1) { return nums; }
//     // 接着，选择"基准"（pivot），并将其与原数组分离，再定义两个空数组，用来存放一左一右的两个子集。
//     var pivotIndex = Math.floor(nums.length / 2) ;
//     var pivot = nums.splice(pivotIndex, 1)[0];
//     var left = [];
//     var right = [];
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] < pivot) {
//             left.push(nums[i])
//         } else {
//             right.push(nums[i])
//         }
//     }
//     return [...quickSort(left), pivot, ...quickSort(right)];
// };


var quickSort = function(nums) {
    const quickSortFn = (start, end) => {
        if (start < end) {
            let mark = nums[start];
            let i = start, j = end;
            while (i < j) {
                while (i < j && nums[j] > mark) {
                    j--;
                }
                if (i < j) {
                    nums[i] = nums[j];
                    i++;
                }
                while (i < j && nums[i] < mark) {
                    i++;
                }
                if (i < j) {
                    nums[j] = nums[i];
                    j--;
                }
            }
            nums[i] = mark;
            quickSortFn(start, i - 1);
            quickSortFn(i + 1, end);
        }
    }
    quickSortFn(0, nums.length - 1);
    return nums;
};

console.log(quickSort([85, 24, 63, 45, 17, 31, 96, 50]))