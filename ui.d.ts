// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

interface UIComponent {
  name: string;
  render: () => void;
}

declare module './src/components/ui/*' {
  const value: UIComponent;
  export default value;
}
