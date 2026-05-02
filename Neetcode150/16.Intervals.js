// Insert Interval
var insert = function(intervals, newInterval) {
    const res = [];
    let i = 0;
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        res.push(intervals[i++]);
    }
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    res.push(newInterval);
    while (i < intervals.length) res.push(intervals[i++]);
    return res;
};
// const intervals = [[1,3],[6,9]], newInterval = [2,5];
// console.log(insert(intervals, newInterval)); // [[1,5],[6,9]]


// Merge Intervals
var merge = function(intervals) {
    intervals.sort((a,b) => a[0]-b[0]);
    const res = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        let prev = res[res.length-1];
        if (intervals[i][0] <= prev[1]) {
            prev[1] = Math.max(prev[1], intervals[i][1]);
        } else {
            res.push(intervals[i]);
        }
    }
    return res;
};
// const intervals = [[1,3],[2,6],[8,10],[15,18]];
// console.log(merge(intervals)); // [[1,6],[8,10],[15,18]]


// Non-Overlapping Intervals
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a,b) => a[1]-b[1]);
    let count = 0, end = -Infinity;
    for (let [start, finish] of intervals) {
        if (start >= end) {
            end = finish;
        } else {
            count++;
        }
    }
    return count;
};
// const intervals = [[1,2],[2,3],[3,4],[1,3]];
// console.log(eraseOverlapIntervals(intervals)); // 1


// Meeting Rooms (Check if person can attend all)
var canAttendMeetings = function(intervals) {
    intervals.sort((a,b) => a[0]-b[0]);
    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i-1][1]) return false;
    }
    return true;
};
// const intervals = [[0,30],[5,10],[15,20]];
// console.log(canAttendMeetings(intervals)); // false


// Meeting Rooms II (Minimum number of rooms)
var minMeetingRooms = function(intervals) {
    if (!intervals.length) return 0;
    const starts = intervals.map(i => i[0]).sort((a,b)=>a-b);
    const ends = intervals.map(i => i[1]).sort((a,b)=>a-b);
    let s = 0, e = 0, rooms = 0, maxRooms = 0;
    while (s < intervals.length) {
        if (starts[s] < ends[e]) {
            rooms++;
            maxRooms = Math.max(maxRooms, rooms);
            s++;
        } else {
            rooms--;
            e++;
        }
    }
    return maxRooms;
};
// const intervals = [[0,30],[5,10],[15,20]];
// console.log(minMeetingRooms(intervals)); // 2


// Minimum Interval to Include Each Query
var minInterval = function(intervals, queries) {
    intervals.sort((a,b) => a[0]-b[0]);
    const sortedQueries = [...queries].sort((a,b)=>a-b);
    const res = {};
    const heap = []; // min-heap by interval length

    let i = 0;
    for (let q of sortedQueries) {
        while (i < intervals.length && intervals[i][0] <= q) {
            let [l,r] = intervals[i++];
            heap.push([r-l+1, r, l]);
            heap.sort((a,b)=>a[0]-b[0]); // naive heap
        }
        while (heap.length && heap[0][1] < q) {
            heap.shift();
        }
        res[q] = heap.length ? heap[0][0] : -1;
    }
    return queries.map(q => res[q]);
};
// const intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5];
// console.log(minInterval(intervals, queries)); // [3,3,1,4]