// Copyright (c) 2025 zdb
// This software is released under the MIT License.

import { Metadata } from 'next';

// https://opensource.org/licenses/MIT
export const metadata: Metadata = {
  title: '客户管理',
  description: '帮助客户管理一些数据',
};
export default function Customers() {
  return (
    <div>
      <h1>Customers</h1>
    </div>
  );
}
