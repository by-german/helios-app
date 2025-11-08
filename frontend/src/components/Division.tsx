
import { Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import type { ColumnType } from 'antd/es/table';
import { useEffect, useState } from 'react';

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
    filters: [
      {
        text: 'División 1',
        value: 'División 1',
      },
      {
        text: 'División 2',
        value: 'División 2',
      },
      {
        text: 'Gibson-Jaskolski',
        value: 'Gibson-Jaskolski',
      },
    ],
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
      {
        text: 'Nivel 1',
        value: 1,
      },
      {
        text: 'Nivel 2',
        value: 2,
      },
      {
        text: 'Nivel 3',
        value: 3,
      },
      {
        text: 'Nivel 4',
        value: 4,
      },
      {
        text: 'Nivel 5',
        value: 5,
      },
    ]
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
  }
];

interface DepartmentsResponse {
  id: number;
  name: string;
  ambassador_name: string;
  employee_count: number;
  level: number;
  superior: DepartmentsResponse;
  subdepartments_count: number
}

export function Division() {
  const [dataSource, setDataSource] = useState([]);
  const [headers, setHeaders] = useState(columns);

  // fetch data (departments)
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/departments').then(res => res.json())
      .then((res) => {
        const data = res.data ?? []
        setDataSource(data.map((data: DepartmentsResponse) => {
          return {
            key: data.id,
            division: data.name,
            parentDivision: data.superior?.name ?? '',
            colaborators: data.employee_count,
            level: data.level,
            subDivisions: data.subdepartments_count,
            embassadors: data.ambassador_name
          }
        }))

        // set filters for division
        setHeaders(
            columns.map((column) => {
            const col = column as ColumnType<DataType>;
            if (col.dataIndex === "division") {
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
        )

      })
      .catch(console.error)
  }, [])

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <div>

      </div>

      <Table<DataType>
        style={{ flex: 1 }}
        columns={headers}
        dataSource={dataSource}
        onChange={onChange}
      />
    </div>
  )
}