import { Input, Radio, Select, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useEffect, useMemo, useState } from 'react';

interface DataType {
  key: React.Key;
  division: string;
  parentDivision: string;
  colaborators: number;
  level: number;
  subDivisions: number;
  embassadors: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'División',
    dataIndex: 'division',
    sorter: {
      compare: (a, b) => a.division.localeCompare(b.division),
      multiple: 4,
    },
    filters: [],
    filterSearch: true,
    onFilter: (value, record) => record.division.startsWith(value as string),
  },
  {
    title: 'División superior',
    dataIndex: 'parentDivision',
    sorter: {
      compare: (a, b) => a.parentDivision.localeCompare(b.parentDivision),
      multiple: 3,
    },
  },
  {
    title: 'Colaboradores',
    dataIndex: 'colaborators',
    sorter: {
      compare: (a, b) => a.colaborators - b.colaborators,
      multiple: 2,
    },
  },
  {
    title: 'Nivel',
    dataIndex: 'level',
    sorter: {
      compare: (a, b) => a.level - b.level,
      multiple: 1,
    },
    filters: [
      { text: 'Nivel 1', value: 1 },
      { text: 'Nivel 2', value: 2 },
      { text: 'Nivel 3', value: 3 },
      { text: 'Nivel 4', value: 4 },
      { text: 'Nivel 5', value: 5 },
    ],
  },
  {
    title: 'Subdivisiones',
    dataIndex: 'subDivisions',
    sorter: {
      compare: (a, b) => a.subDivisions - b.subDivisions,
      multiple: 0,
    },
  },
  {
    title: 'Embajadores',
    dataIndex: 'embassadors',
  },
];

interface DepartmentsResponse {
  id: number;
  name: string;
  ambassador_name: string;
  employee_count: number;
  level: number;
  superior: DepartmentsResponse;
  subdepartments_count: number;
}

export function Division() {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [headers, setHeaders] = useState(columns);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch data with pagination
  const fetchData = (page: number = 1) => {
    setLoading(true);
    fetch(`http://localhost:8000/api/v1/departments?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.data ?? [];
        setDataSource(
          data.map((d: DepartmentsResponse) => ({
            key: d.id,
            division: d.name,
            parentDivision: d.superior?.name ?? '',
            colaborators: d.employee_count,
            level: d.level,
            subDivisions: d.subdepartments_count,
            embassadors: d.ambassador_name,
          }))
        );

        // update pagination info from API
        setPagination({
          current: res.meta.current_page,
          pageSize: res.meta.per_page,
          total: res.meta.total,
        });

        // set filters dynamically for "División"
        setHeaders(
          columns.map((column) => {
            const col = column as ColumnType<DataType>;
            if (col.dataIndex === 'division') {
              return {
                ...col,
                filters: data.map((d: DepartmentsResponse) => ({
                  text: d.name,
                  value: d.name,
                })),
              };
            }
            return col;
          })
        );
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData(pagination.current);
  }, []);

  const handleTableChange: TableProps<DataType>['onChange'] = (newPagination) => {
    fetchData(newPagination.current || 1);
  };

  const handleChangeColumnToSearch = (value: string) => {
    setSearchedColumn(value);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const filteredData = useMemo(() => {
    if (!searchText || !searchedColumn) return dataSource;
    return dataSource.filter((item) => {
      const value = item[searchedColumn as keyof DataType];
      if (value === undefined || value === null) return false;
      return String(value).toLowerCase().includes(searchText.toLowerCase());
    });
  }, [searchText, searchedColumn, dataSource]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 26,
        }}
      >
        <div>
          <Radio.Group>
            <Radio.Button value="list">Listado</Radio.Button>
            <Radio.Button value="tree">Arbol</Radio.Button>
          </Radio.Group>
        </div>

        {/* Search action */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Select
            defaultValue="Columnas"
            style={{ width: 150 }}
            onChange={handleChangeColumnToSearch}
            options={columns.map((column: ColumnType<DataType>) => ({
              value: column.dataIndex,
              label: column.title,
            }))}
          />

          <Input.Search
            placeholder="Buscar"
            style={{ width: 200 }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      <Table<DataType>
        style={{ flex: 1 }}
        columns={headers}
        dataSource={filteredData}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}
