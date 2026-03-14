const optimizedCombinationSum = (candidates, target) => {
    const result = [];
    candidates.sort((a, b) => a - b);

    const backtrack = (remain, comb, start) => {
        if (remain === 0) {
            result.push([...comb]);
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) break; // Early termination
            comb.push(candidates[i]);
            backtrack(remain - candidates[i], comb, i);
            console.log(comb);
            comb.pop();
        }
    };

    backtrack(target, [], 0);
    return result;
};

console.log(optimizedCombinationSum([2,3,5], 8)); // [[2,2,2,2],[2,3,3],[3,5]]