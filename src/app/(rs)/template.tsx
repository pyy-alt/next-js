// https://opensource.org/licenses/MIT
// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-appear">{children}</div>;
}
