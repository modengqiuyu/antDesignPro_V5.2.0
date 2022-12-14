import { Button, Form, Input, Popconfirm, Table } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };
    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({
                ...record,
                ...values,
            });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };
    let childNode = children;
    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }
    return <td {...restProps}>{childNode}</td>;
};
const editTable = (props) => {
    const { form, dataSource, name } = props
    const [count, setCount] = useState(dataSource?.length + 1);
    useEffect(() => {
        setCount(dataSource?.length + 1)
    }, [dataSource])
    console.log('props', props)
    const handleDelete = (val) => {
        const updateSecondData = dataSource.filter((item) => item.secondName !== val);
        console.log('form', form.getFieldsValue(true))
        console.log('updateSecondData', updateSecondData)
        console.log('val', val)
        console.log('name', name)

        const oldData = form.getFieldValue(`firstEquip`)
        oldData[name].zbxqs = updateSecondData
        form.setFieldsValue({
            firstEquip: oldData,
        });
    };
    const defaultColumns = [
        {
            title: '????????????????????????',
            dataIndex: 'secondName',
            width: 300,
            editable: true,
            align: 'center'
        },
        {
            title: '?????????',
            dataIndex: 'xds',
            width: 200,
            editable: true,
            align: 'center'
        },
        {
            title: '????????????',
            dataIndex: 'zbdw',
            width: 200,
            editable: true,
            align: 'center'
        },
        {
            title: '??????',
            dataIndex: 'operation',
            align: 'center',
            width: 80,
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="???????????????" onConfirm={() => handleDelete(record.secondName)}>
                        <a>??????</a>
                    </Popconfirm>
                ) : null,
        },
    ];
    const handleAdd = () => {
        const newData = {
            secondName: `test${count}`,
            xds: '1',
            zbdw: '???',
            key: count
        };
        const newSecondDataArray = [...dataSource, newData]
        console.log('form', form.getFieldsValue(true))
        console.log('name', name)
        console.log('newSecondDataArray', newSecondDataArray)

        const oldData = form.getFieldValue(`firstEquip`)
        oldData[name].zbxqs = newSecondDataArray
        form.setFieldsValue({
            firstEquip: oldData,
        });
    };
    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, row);
        console.log('item', item)
        console.log('row', row)
        console.log('newData', newData)
        const currentData = form.getFieldValue(`firstEquip`)
        currentData[name].zbxqs = newData
        form.setFieldsValue({
            firstEquip: currentData,
        });
    };
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                key: col.key,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <Button
                onClick={handleAdd}
                type="primary"
                style={{
                    marginBottom: 16,
                }}
            >
                ????????????
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) =>
                    name * 1000 + record.key
                }
                pagination={false}
            />
        </div>
    );
};
export default editTable;