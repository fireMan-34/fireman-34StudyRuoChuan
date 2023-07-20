
type IMatrix<T = number> = T[][];

interface IGetMatrixValue<T = number> {
  (matrixItem: T) : number;
}

interface ICustMatrixAWithB<T> {
  (matrixAItem: T, matrixBItem: T) : T;
}

const getDefaultMatrixItem: IGetMatrixValue = (value: number) => value;

const defaultValue = (val: unknown, defaultVal: unknown) => val ?? defaultVal;

/**
 * 快速幂运算
 * @param a 底数
 * @param pow 阶乘
 */
const multiQuick = (a: number, pow: number) => {
  let curPow = pow, result = 1;

  while(curPow) {
    if (curPow === 0) {
      result *= 1;
    } else if (curPow === 1) {
      result *= a;
      curPow = 0;
    } else if (curPow % 2 === 1) {
      result *= result * a;
      curPow -= 1;
    } else if (curPow % 2 === 0) {
      result *= result;
      curPow >>= 1;
    }
  };

  return result;
};

/**
 * 二维矩阵 helper
 * 开发关键词 原子性， 泛用性， 辅助实例
 * https://juejin.cn/post/7040103778917285896?searchId=202307190941476148EAB7118D841FF73E#heading-3
 */
class Matrix2Level {
  static getCol<T = number>(matrix: IMatrix<T>, colIndex: number) {
    return matrix.map(row => row[colIndex])
  };

  static getRow<T = number>(matrix: IMatrix<T>, rowIndex: number) {
    return matrix?.[rowIndex]
  };

  static getMatrixLen<T = number>(matrix: IMatrix<T>) {
    return {
      rowLen: matrix.length,
      colLen: Math.max(...matrix.map(row => row.length)),
    }
  };



  static isHomotypeMatrix<T = number>(matrix1: IMatrix<T>, matrix2: IMatrix<T>): boolean { 
    if (matrix1.length !== matrix2.length) {
      return false;
    }
    const maxRowLen = (matrix: IMatrix<T>) => Math.max(...matrix.map(row => row.length));
    if (maxRowLen(matrix1) !== maxRowLen(matrix2)) {
      return false;
    }

    return true;
  };

  static isUnitMatrix<T = number>(matrix: IMatrix<T>, getMatrixVal?: IGetMatrixValue<T>) {
    const handleGetMatrixValue = getMatrixVal || getDefaultMatrixItem;

    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      for (let j = 0; j < row.length; j++) {
        const isSameIdx = i === j;
        const val = handleGetMatrixValue(matrix[i][j] as any);

        if (isSameIdx && val !== 1) {
          return false;
        }

        if (!isSameIdx && val !== 0) {
          return false;
        }
      }
    }

    return true;
  };

  static computeHomotypeMatrix<T = number>(matrix1: IMatrix<T>, matrix2: IMatrix<T>, custom: ICustMatrixAWithB<T>): IMatrix<T> { 
    if (!this.isHomotypeMatrix(matrix1, matrix2)) {
      throw new Error('该矩阵非二维数组');
    }
    const { rowLen, colLen } = this.getMatrixLen(matrix1) 

    const nextMatrix: T[][] = [];
    
    for (let i = 0; i < rowLen; i++) { 
      nextMatrix[i] = [];
      for (let j = 0; j < colLen; j++) { 
        nextMatrix[i][j] = custom(matrix1[i]?.[j], matrix2[i]?.[j]);
      }
    }
    return nextMatrix;
  };
  
  static addHomotypeMatrix(matrix1: IMatrix<number>, matrix2: IMatrix<number>) {
    return this.computeHomotypeMatrix(matrix1, matrix2, (num1, num2) => num1 + num2);
  };
  
  static subHomotypeMatrix(matrix1: IMatrix<number>, matrix2: IMatrix<number>) {
    return this.computeHomotypeMatrix(matrix1, matrix2, (num1, num2) => num1 - num2);
  };
  
  static mapMatralItem<T>(matrix: IMatrix<T>, map: (matrix: T) => T) {
    
    const nextMatrix: IMatrix<T> = [];
    
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i] || [];
      nextMatrix[i] = [];
      
      for (let j = 0; j < row.length; j++) {
        const item = row[j];
        nextMatrix[i][j] = map(item);
      }
    }
    
    return nextMatrix;
  };
  
  static multipleItemMatrix(matrix: IMatrix<number>, multiple: number) {
    return this.mapMatralItem(matrix, (item) => item * multiple);
  };
  
  static randConversionMatrix<T>(matrix: IMatrix<T>) {
    const { rowLen, colLen } = this.getMatrixLen(matrix);
    const nextMatrix:IMatrix<T> = [];
    for (let i = 0; i < colLen; i++) {
      nextMatrix[i] = [];
      for (let j = 0; j < rowLen; j++) { 
        nextMatrix[i][j] = matrix[j][i];
      }
    };

    return nextMatrix;
  };

  static multiplyMatrix(matrix1: IMatrix<number>, matrix2: IMatrix<number>) {
    const { colLen, rowLen: nexRowLen } = this.getMatrixLen(matrix1);
    const { rowLen, colLen: nexColLen } = this.getMatrixLen(matrix2);

    if (colLen !== rowLen) {
      /** A m * n * B n * p = C m *p */
      throw new Error('矩阵乘法必须，前矩阵列数等于后矩阵行数');
    }
    
    const nextMatrix: IMatrix = [];

    for (let i = 0; i < nexRowLen; i++) {
      nextMatrix[i] = [];
      const curCol = this.getCol(matrix1, i);
      for (let j = 0; j < nexColLen; j++) {
        const curRow = this.getRow(matrix2, j);
        const len = Math.max(curCol.length, curRow.length);
        const computed = Array.from({
          length: len,
        }, (_, idx) => {
          const curColVal = curCol[idx] || 0;
          const curRowVal = curRow[idx] || 0;
          return curColVal * curRowVal;
        });

        nextMatrix[i][j] = computed.reduce((acc, cur) => acc + cur, 0);
       }
    }
    
    return nextMatrix;
  };

  static multilpyQuiickMatrix(matrix: IMatrix<number>, pow: number) {
    return this.mapMatralItem(matrix, (num) => multiQuick(num, pow))
  };

};

const matrix1 = [
  [0, 0, 1],
  [2, 3, 4],
];

const matrix2 = [
  [0, 3, 1],
  [8, 3, 4],
];

const matrix3 = [
  [0, 3, 1],
  [8, 3, 4],
  [1, 8, 4],
];

const matrix4 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
];

const matrix5 = [
  [1, 0, 0],
  [0, 1, 1],
  [0, 0, 1],
];


console.log('获取第二列', Matrix2Level.getCol(matrix1, 1));
console.log('获取第二排', Matrix2Level.getRow(matrix1, 1));
console.log('获取 m * n 矩阵参数', Matrix2Level.getMatrixLen(matrix1));
console.log('判断是否为同行矩阵', Matrix2Level.isHomotypeMatrix(matrix1, matrix2), Matrix2Level.isHomotypeMatrix(matrix1, matrix3));
console.log('判断是否为对角（单元）矩阵', Matrix2Level.isUnitMatrix(matrix4), Matrix2Level.isUnitMatrix(matrix5));
console.log('同型组件和运算', Matrix2Level.addHomotypeMatrix(matrix1, matrix2));
console.log('同型组件差运算', Matrix2Level.subHomotypeMatrix(matrix1, matrix2));
console.log('同型组件批运算', Matrix2Level.computeHomotypeMatrix(matrix1, matrix2, (num1, num2) => num1 * num2));
console.log('矩阵map运算', Matrix2Level.mapMatralItem(matrix1, (num) => num ** 2));
console.log('矩阵数乘', Matrix2Level.multipleItemMatrix(matrix1, 3));
console.log('矩阵转秩', Matrix2Level.randConversionMatrix(matrix1));
// 共轭复数 1 + 2i 在复平面的 1 - 2i
console.log('矩阵乘法', Matrix2Level.multiplyMatrix(matrix4, matrix5), Matrix2Level.multiplyMatrix(matrix1, matrix4));
console.log('矩阵快速幂', Matrix2Level.multilpyQuiickMatrix(matrix3, 9))
