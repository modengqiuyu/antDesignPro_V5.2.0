import type { ProColumns } from '@ant-design/pro-components';
import {
    EditableProTable,
    ProCard,
    ProFormField,
    useRefFunction,
} from '@ant-design/pro-components';
import React, { useState } from 'react';
import { Button } from 'antd'
import moment from 'moment';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

type DataSourceType = {
    parentId: React.Key | any;
    id: React.Key | any;
    title?: string;
    decs?: string;
    state?: string;
    created_at?: string;
    update_at?: string;
    children?: DataSourceType[];
    image?: any
};

const defaultData: DataSourceType[] = [
    {
        parentId: null,
        id: 624748504,
        title: '活动名称一',
        decs: '这个活动真好玩',
        state: 'open',
        created_at: '2020-05-26T09:42:56Z',
        update_at: '2020-05-26T09:42:56Z',
        image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        children: [
            {
                parentId: 624748504,
                id: 6246912293,
                title: '活动名称二',
                decs: '这个活动真好玩',
                state: 'closed',
                created_at: '2020-05-26T08:19:22Z',
                update_at: '2020-05-26T08:19:22Z',
                image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            },
        ],
    },
    {
        parentId: null,
        id: 624691229,
        title: '活动名称二',
        decs: '这个活动真好玩',
        state: 'closed',
        created_at: '2020-05-26T08:19:22Z',
        update_at: '2020-05-26T08:19:22Z',
        image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',

    },
];

const loopDataSourceFilter = (
    data: DataSourceType[],
    id: React.Key | undefined,
): DataSourceType[] => {
    return data
        .map((item) => {
            if (item.id !== id) {
                if (item.children) {
                    const newChildren = loopDataSourceFilter(item.children, id);
                    return {
                        ...item,
                        children: newChildren.length > 0 ? newChildren : undefined,
                    };
                }
                return item;
            }
            return null;
        })
        .filter(Boolean) as DataSourceType[];
};
export default () => {
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
    const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

    const removeRow = useRefFunction((record: DataSourceType) => {
        setDataSource(loopDataSourceFilter(dataSource, record.id));
    });

    const addFirst = () => {
        let newArray = dataSource;
        newArray.push(
            {
                parentId: null,
                id: (Math.random() * 1000000).toFixed(0),
                title: (Math.random() * 1000000).toFixed(0),
                decs: '',
                state: '',
                created_at: moment(new Date()).toString(),
                update_at: moment(new Date()).toString(),
                image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            })
        setDataSource([...newArray])
    }
    const addSecond = (parentId: any) => {
        console.log('parentId', parentId)
        let newArray = dataSource;
        let childrenList =
        {
            parentId: parentId,
            id: (Math.random() * 1000000).toFixed(0),
            title: (Math.random() * 1000000).toFixed(0),
            decs: '',
            state: '',
            created_at: moment(new Date()).toString(),
            update_at: moment(new Date()).toString(),
            image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        }
        let newList = newArray.map((item, index) => {
            if (item.id == parentId) {
                if (item.hasOwnProperty("children")) {
                    let newChildrenArray = item.children || [];
                    newChildrenArray.push(childrenList);
                    return Object.assign({}, item, {
                        children: newChildrenArray
                    });
                }
                else {
                    return Object.assign({}, item, {
                        children: [childrenList]
                    });
                }
            }
            else {
                return item
            }
        })
        setDataSource([...newList])
    }
    const columns: ProColumns<DataSourceType>[] = [
        {
            title: '活动名称',
            dataIndex: 'title',
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
                };
            },
            width: '30%',
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
                all: { text: '全部', status: 'Default' },
                open: {
                    text: '未解决',
                    status: 'Error',
                },
                closed: {
                    text: '已解决',
                    status: 'Success',
                },
            },
        },
        {
            title: '描述',
            dataIndex: 'decs',
            fieldProps: (from, { rowKey, rowIndex }) => {
                if (from.getFieldValue([rowKey || '', 'title']) === '不好玩') {
                    return {
                        disabled: true,
                    };
                }
                if (rowIndex > 9) {
                    return {
                        disabled: true,
                    };
                }
                return {};
            },
        },
        {
            title: '活动时间',
            dataIndex: 'created_at',
            valueType: 'date',
        },
        {
            title: '头像',
            dataIndex: 'image',
            valueType: 'image',
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                record?.parentId == null &&
                <a
                    key="add"
                    onClick={() => {
                        addSecond(record.id);
                    }}
                >
                    新增下级
                </a>,
                <a
                    key="delete"
                    onClick={() => {
                        removeRow(record);
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];

    return (
        <>
            <div>
                <Button onClick={() => addFirst()}>
                    新增
                </Button>
            </div>
            <EditableProTable<DataSourceType>
                expandable={{
                    // 使用 request 请求数据时无效
                    defaultExpandAllRows: true,
                }}
                scroll={{
                    x: 960,
                }}
                rowKey="id"
                headerTitle="可编辑表格"
                // maxLength={5}  最大行数，达到最大行数新建按钮自动消失
                recordCreatorProps={false}
                // recordCreatorProps={{

                //     position: 'bottom',
                //     newRecordType: 'dataSource',
                //     parentKey: () => 624748504,
                //     record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                // }}
                columns={columns}
                value={dataSource}
                onChange={setDataSource}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log(rowKey, data, row);
                        await waitTime(500);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
            <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
                <ProFormField
                    ignoreFormItem
                    fieldProps={{
                        style: {
                            width: '100%',
                        },
                    }}
                    mode="read"
                    valueType="jsonCode"
                    text={JSON.stringify(dataSource)}
                />
            </ProCard>
        </>
    );
};