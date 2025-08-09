'use client'
import * as React from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/table'

type Row = { email: string; role: string; status: string }
export default function AdminTable(){
  const [data,setData]=React.useState<Row[]>([])
  React.useEffect(()=>{ fetch('/api/admin/users').then(r=>r.json()).then(setData)},[])
  const columns: ColumnDef<Row>[] = [
    { header:'Email', accessorKey:'email' },
    { header:'Role', accessorKey:'role' },
    { header:'Status', accessorKey:'status' }
  ]
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mb-4">Admin • Users</h1>
      <Table>
        <THead><TR>{table.getFlatHeaders().map(h=><TH key={h.id}>{flexRender(h.column.columnDef.header, h.getContext())}</TH>)}</TR></THead>
        <TBody>{table.getRowModel().rows.map(r=>(<TR key={r.id}>{r.getVisibleCells().map(c=><TD key={c.id}>{flexRender(c.column.columnDef.cell ?? c.column.columnDef.header, c.getContext())}</TD>)}</TR>))}</TBody>
      </Table>
    </div>
  )
}
