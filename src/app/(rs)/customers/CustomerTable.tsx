// Copyright (c) 2025 zdb
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use client';
import type { selectCustomerSchemaType } from '@/zod-schemas/customer';

import { CellContext, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MoreHorizontal, TableOfContents } from 'lucide-react';

type Props = {
  data: selectCustomerSchemaType[];
};
export default function CustomerTable({ data }: Props) {
  const router = useRouter();

  const columnHeadersArray: Array<keyof selectCustomerSchemaType> = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'city',
    'zip',
  ];
  const columnHelper = createColumnHelper<selectCustomerSchemaType>();

  const ActionsCell = ({ row }: CellContext<selectCustomerSchemaType, unknown>) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-8 h-8" variant={'ghost'}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/tickets/form?customerId=${row.original.id}`} className="w-full" prefetch={false}>
              New Ticket
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/customers/form?customerId=${row.original.id}`} className="w-full" prefetch={false}>
              Edit Customer
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  ActionsCell.displayName = 'ActionsCell';

  const columns = [
    ...columnHeadersArray.map((columnName) => {
      return columnHelper.accessor(columnName, {
        id: columnName,
        header: columnName[0].toUpperCase() + columnName.slice(1),
      });
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <TableOfContents />,
      cell: ActionsCell,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="mt-6 rounded-lg overflow-hidden border border-border">
      <Table className="border">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="bg-secondary">
                  <div className='flex justify-center items-center'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
              onClick={() => router.push(`/customers/form?customerId=${row.original.id}`)}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
