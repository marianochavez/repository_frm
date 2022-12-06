import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  Table as ReactTable,
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { IRepository } from "../types/repository";

type Props = {
  data: IRepository[];
  columns: ColumnDef<IRepository>[];
};

const ContrubutionsTable = ({ data, columns }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    // Pipeline
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <TableContainer px={10} py={5}>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <Box
                          fontSize="sm"
                          textAlign="center"
                          cursor={header.column.getCanSort() ? "pointer" : ""}
                          userSelect={
                            header.column.getCanSort() ? "none" : "auto"
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {/* SORT */}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                          {/* END SORT */}
                          {/* FILTER */}
                          {header.column.getCanFilter() ? (
                            <Box>
                              <Filter column={header.column} table={table} />
                            </Box>
                          ) : null}
                          {/* FILTER END */}
                        </Box>
                      )}
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td key={cell.id} textAlign="center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Pagination table={table} />
    </>
  );
};

type FilterProps = {
  column: Column<any, any>;
  table: ReactTable<any>;
};

const Filter = ({ column, table }: FilterProps) => {
  // const firstValue = table
  //   .getPreFilteredRowModel()
  //   .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return (
    <Input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={`Buscar...`}
      size="sm"
      rounded="lg"
      mt={2}
    />
  )

  // return typeof firstValue === "number" ? (
  //   <Flex gap={2}>
  //     <Input
  //       type="number"
  //       value={(columnFilterValue as [number, number])?.[0] ?? ""}
  //       onChange={(e) =>
  //         column.setFilterValue((old: [number, number]) => [
  //           e.target.value,
  //           old?.[1],
  //         ])
  //       }
  //       placeholder={`Min`}
  //       w={24}
  //     />
  //     <Input
  //       type="number"
  //       value={(columnFilterValue as [number, number])?.[1] ?? ""}
  //       onChange={(e) =>
  //         column.setFilterValue((old: [number, number]) => [
  //           old?.[0],
  //           e.target.value,
  //         ])
  //       }
  //       placeholder={`Max`}
  //       w={24}
  //     />
  //   </Flex>
  // ) : (
  //   <Input
  //     type="text"
  //     value={(columnFilterValue ?? "") as string}
  //     onChange={(e) => column.setFilterValue(e.target.value)}
  //     placeholder={`Buscar...`}
  //     size="sm"
  //     rounded="lg"
  //     mt={2}
  //   />
  // );
};

const Pagination = ({ table }: { table: ReactTable<any> }) => (
  <Flex alignItems="center" justifyContent="center" pb={2}>
    <Button
      onClick={() => table.setPageIndex(0)}
      disabled={!table.getCanPreviousPage()}
      variant="ghost"
      border="1px"
      colorScheme="blackAlpha"
      rounded="none"
      roundedLeft="lg"
      roundedRight="none"
    >
      {"<<"}
    </Button>
    <Button
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      variant="ghost"
      borderY="1px"
      borderRight="1px"
      colorScheme="blackAlpha"
      rounded="none"
    >
      {"<"}
    </Button>
    <Button
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      variant="ghost"
      border="1px"
      colorScheme="blackAlpha"
      rounded="none"
    >
      {">"}
    </Button>
    <Button
      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      disabled={!table.getCanNextPage()}
      variant="ghost"
      borderY="1px"
      borderRight="1px"
      colorScheme="blackAlpha"
      roundedLeft="none"
      roundedRight="lg"
    >
      {">>"}
    </Button>

    <Flex gap={1} alignItems="center" ml={3}>
      <Text>Página</Text>
      <strong>
        {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
      </strong>
    </Flex>
  </Flex>
);

export default ContrubutionsTable;
