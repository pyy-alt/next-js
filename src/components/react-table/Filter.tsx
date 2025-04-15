// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import { Column } from '@tanstack/react-table';
import { DebouncedInput } from '@/components/react-table/DebouncedInput';

type Props<T> = {
  column: Column<T, unknown>;
};

export default function Filter<T>({ column }: Props<T>) {
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = Array.from(column.getFacetedUniqueValues().keys()).sort();

  return (
    <>
      {/*  <datalist> 是一个标准的 HTML 元素。它本身并不是 React 组件，而是浏览器内置的功能。 */}
      {/* 搜索时候展示的数据列表 */}
      <datalist id={column.id + 'list'}>
        {sortedUniqueValues.map((value, i) => (
          <option value={value} key={`${i}-${column.id}`} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        /**
         * ?? 表示 空值合并运算符
         * 当columnFilterValue 等于 undefined 或者 null 的时候直接取 空字符串
         * 否则使用  当columnFilterValue 本身
         * 最后断言为字符串类型
         * 这样做更安全
         */
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${[...column.getFacetedUniqueValues()].filter((arr) => arr[0]).length})`}
        className="w-full border shadow rounded bg-card"
        // HTML <input> 元素有一个 list 属性，它的值应该设置为页面上一个 <datalist> 元素的 id
        list={column.id + 'list'}
      />
    </>
  );
}
