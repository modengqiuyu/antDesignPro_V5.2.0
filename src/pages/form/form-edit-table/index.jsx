import React, { useEffect, useState, useMemo, useContext, useRef } from 'react';
import { Empty, Radio, Table, Row, Col, message, Modal, Spin, Select, Button, Form, Input, Popconfirm, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import FormChildren from './editTable'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

const Equipment = (props) => {
    const { dispatch } = props;
    // 表格数据
    const [defaultSource, setDefaultSource] = useState([]);
    const [defaultTrue, setDefaultTrue] = useState(false);
    const [form] = Form.useForm();
    const armyNewList = [
        {
            name: '成都支队',
            dwid: '1000',
        },
        {
            name: '阿坝支队',
            dwid: '2000',
        },
        {
            name: '雅安支队',
            dwid: '3000',
        },
        {
            name: '广元支队',
            dwid: '4000',
        },
    ]
    useEffect(() => {
        const taskEditArray = [
            {
                troop: ['成都支队', '1000'],
                zblxmc: '救援器材',
                zbxqs: [
                    {
                        secondName: '灭火器',
                        xds: 20,
                        zbdw: '个',
                        key: 1,
                    },
                    {
                        secondName: '担架',
                        xds: 30,
                        zbdw: '个',
                        key: 2,
                    },
                    {
                        secondName: '医疗箱',
                        xds: 60,
                        zbdw: '个',
                        key: 3,
                    }
                ]
            },
            {
                troop: ['阿坝支队', '2000'],
                zblxmc: '运兵车',
                zbxqs: [
                    {
                        secondName: '运兵车1',
                        xds: 20,
                        zbdw: '辆',
                        key: 1,
                    },
                    {
                        secondName: '摩托车',
                        xds: 80,
                        zbdw: '辆',
                        key: 2,
                    },
                    {
                        secondName: '坦克',
                        xds: 5,
                        zbdw: '辆',
                        key: 3,
                    }
                ]
            },
            {
                troop: ['雅安支队', '3000'],
                zblxmc: '侦察设备',
                zbxqs: [
                    {
                        secondName: '无人机1',
                        xds: 8,
                        zbdw: '架',
                        key: 1,
                    },
                    {
                        secondName: '无人机2',
                        xds: 15,
                        zbdw: '架',
                        key: 2,
                    },
                    {
                        secondName: '雷达3',
                        xds: 5,
                        zbdw: '个',
                        key: 3,
                    }
                ]
            },
        ]
        setDefaultSource(taskEditArray)
    }, [])
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };
    const layout2 = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const addFirst = () => {
        const currentData = form.getFieldValue(`firstEquip`)
        let index = currentData?.length - 1;
        console.log('currentData', currentData)
        currentData[index] = {
            troop: [],
            zblxmc: '',
            zbxqs: [
                {
                    secondName: 'secondName',
                    xds: 1,
                    zbdw: '个',
                    key: 1,
                }
            ]

        }
    }

    return (
        <PageContainer content="动态表单级联可编辑单元格表格的实现。">
            {/* <div style={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: '20px' }}> */}
            <div style={{ overflowY: 'auto', marginBottom: '20px' }}>

                {defaultSource.length > 0 &&
                    <Form form={form} name="equipForm" onFinish={onFinish} autoComplete="off" initialValues={{ firstEquip: defaultSource }} style={{ marginTop: '10px' }}>
                        <Form.List name="firstEquip" >
                            {(fields, { add, remove }) => (
                                <>

                                    <div>
                                        {fields.map(({ key, name, field, index, ...restField }) => (

                                            <>
                                                <Row style={{ marginLeft: 20 }}>
                                                    <Col span={8}>

                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'troop']}
                                                            label="部队名称"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: '请选择部队名称',
                                                                },
                                                            ]}
                                                        >
                                                            <Select  >
                                                                {armyNewList.map((item) => (
                                                                    <Select.Option key={[item.name, item.dwid]}>{item.name}</Select.Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={1}>
                                                    </Col>
                                                    <Col span={10}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'zblxmc']}
                                                            label="一级装备物资名称"
                                                            {...layout2}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: '请输入一级装备物资名称',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="一级装备物资名称" />
                                                        </Form.Item>
                                                    </Col>

                                                    <Col span={2}>
                                                        <MinusCircleOutlined style={{ marginTop: 8, marginLeft: 5 }} onClick={() => remove(name)} />
                                                    </Col>

                                                </Row>

                                                <Row>
                                                    <Form.Item name={[name, 'zbxqs']} fieldKey={[name, 'zbxqs']} valuePropName="dataSource">
                                                        <FormChildren name={name} form={form} />
                                                    </Form.Item>
                                                </Row>
                                            </>

                                        ))}
                                        <Form.Item>
                                            <Button style={{ marginTop: 5, width: 600, marginLeft: 100 }} type="dashed" onClick={() => {
                                                add()
                                                addFirst()
                                            }
                                            } block icon={<PlusOutlined />}>
                                                新增一级装备物资
                                            </Button>
                                        </Form.Item>

                                    </div>
                                </>
                            )}
                        </Form.List>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                }
            </div>
        </PageContainer>
    );
};

export default Equipment;
