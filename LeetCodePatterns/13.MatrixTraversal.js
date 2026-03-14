/**
 * Matrix Traversal is a technique used to visit all the elements in a matrix (2D array) systematically.
 * It can be done in various patterns such as row-wise, column-wise, spiral order,
 * or zigzag order.
 * Common applications include:
 * 54. Spiral Matrix
 * 59. Spiral Matrix II
 * 73. Set Matrix Zeroes
 * 240. Search a 2D Matrix II
 * 74. Search a 2D Matrix
 * 733. Flood Fill
 * 200. Number of Islands
 * 130. Surrounded Regions
 */
 
/** 54. Spiral Matrix
 * @param {number[][]} matrix   
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    if (matrix.length === 0) return [];
    
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;
    
    while (top <= bottom && left <= right) {
        // Traverse from left to right
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;
        
        // Traverse from top to bottom
        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;
        
        if (top <= bottom) {
            // Traverse from right to left
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }
        
        if (left <= right) {
            // Traverse from bottom to top
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }
    
    return result;
}
/** 59. Spiral Matrix II
 * @param {number} n
 * @return {number[][]}
 * */
var generateMatrix = function(n) {  
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    let top = 0, bottom = n - 1;
    let left = 0, right = n - 1;
    let num = 1;
    
    while (top <= bottom && left <= right) {
        // Fill from left to right
        for (let i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;
        
        // Fill from top to bottom
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;
        
        if (top <= bottom) {
            // Fill from right to left
            for (let i = right; i >= left; i--) {
                matrix[bottom][i] = num++;
            }
            bottom--;
        }
        
        if (left <= right) {
            // Fill from bottom to top
            for (let i = bottom; i >= top; i--) {
                matrix[i][left] = num++;
            }
            left++;
        }
    }
    
    return matrix;
}
/** 73. Set Matrix Zeroes
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const zeroRows = new Set();
    const zeroCols = new Set();
    
    // First pass: find all zero positions
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 0) {
                zeroRows.add(i);
                zeroCols.add(j);
            }
        }
    }
    
    // Second pass: set rows and columns to zero
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (zeroRows.has(i) || zeroCols.has(j)) {
                matrix[i][j] = 0;
            }
        }
    }
    return matrix;
}
/** 733. Flood Fill
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, newColor) {
    const rows = image.length;
    const cols = image[0].length;
    const originalColor = image[sr][sc];
    
    if (originalColor === newColor) return image; // No need to fill if the color is the same
    
    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || image[r][c] !== originalColor) return;
        
        image[r][c] = newColor; // Fill with new color
        
        // Explore all four directions
        dfs(r - 1, c); // Up
        dfs(r + 1, c); // Down
        dfs(r, c - 1); // Left
        dfs(r, c + 1); // Right
    }
    
    dfs(sr, sc);
    return image;
}

/** 200. Number of Islands
 * @param {character[][]} grid
 * @return {number}
 */
var numIslandsBFS = function(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    const result = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const queue = [];
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1' && result[r][c] === Infinity) {
                islandCount++;
                queue.push([r, c]);
                result[r][c] = 0; // Start point
                grid[r][c] = '0'; // Mark as visited
            } else if (grid[r][c] === '0') {
                result[r][c] = 0; // Water cell
            }
            while (queue.length > 0) {
                const [currentRow, currentCol] = queue.shift();
                
                for (const [dr, dc] of directions) {
                    const newRow = currentRow + dr;
                    const newCol = currentCol + dc;
                    
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === '1') {
                        grid[newRow][newCol] = '0'; // Mark as visited
                        result[newRow][newCol] = result[currentRow][currentCol] + 1; // Update distance
                        queue.push([newRow, newCol]);
                    }
                }
            }
        }
        }
    return islandCount;
}

/*240. Search a 2D Matrix II
    * @param {number[][]} matrix
    * @param {number} target
    * @return {boolean}
    */
var searchMatrix = function(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let row = 0, col = cols - 1; // Start from top-right corner
    
    while (row < rows && col >= 0) {
        if (matrix[row][col] === target) {
            return true; // Found the target
        } else if (matrix[row][col] > target) {
            col--; // Move left
        } else {
            row++; // Move down
        }
    }
    
    return false; // Target not found
}
/**
 * 74. Search a 2D Matrix
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrixII = function(matrix, target) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    let left = 0, right = rows * cols - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = matrix[Math.floor(mid / cols)][mid % cols];
        
        if (midValue === target) {
            return true; // Found the target
        } else if (midValue < target) {
            left = mid + 1; // Search in the right half
        } else {
            right = mid - 1; // Search in the left half
        }
    }
    
    return false; // Target not found
}

/*130. Surrounded Regions
    * @param {character[][]} board
    * @return {void} Do not return anything, modify board in-place instead.
    */
var solve = function(board) {
    if (!board || board.length === 0 || board[0].length === 0) return;
    
    const rows = board.length;
    const cols = board[0].length;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    
    // Mark border 'O's and connected 'O's with 'E'
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if ((r === 0 || r === rows - 1 || c === 0 || c === cols - 1) && board[r][c] === 'O') {
                mark(board, r, c);
            }
        }
    }
    
    // Flip 'O's to 'X's and 'E's back to 'O's
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === 'O') {
                board[r][c] = 'X'; // Flip surrounded regions
            } else if (board[r][c] === 'E') {
                board[r][c] = 'O'; // Restore border regions
            }
        }
    }
}
function mark(board, r, c) {
    const rows = board.length;
    const cols = board[0].length;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;
    
    board[r][c] = 'E'; // Mark as escaped
    
    // Explore all four directions
    mark(board, r - 1, c); // Up
    mark(board, r + 1, c); // Down
    mark(board, r, c - 1); // Left
    mark(board, r, c + 1); // Right
}





