import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Row, Col } from 'antd';
import React from 'react';
const ConactItem = (props) => {
    const { name } = props
    console.log('name', name)

    return (
        <div>
            <Form.Item name={[name, 'zbxqs']} fieldKey={[name, 'zbxqs']}>
                <Form.List name={[name, 'zbxqs']}>
                    {(fields2, { add, remove }) => {
                        return (
                            <>
                                {fields2.map((innerField, index1) => (
                                    <Row gutter={[4, 0]} style={{ marginTop: 6, marginLeft: 90 }}>
                                        <Col span={8}>
                                            <Form.Item
                                                {...innerField}
                                                label="二级装备物资名称"
                                                name={[innerField.name, 'secondName']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入二级装备物资名称',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="二级装备物资名称" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={7}>
                                            <Form.Item
                                                {...innerField}
                                                label="携带数"
                                                name={[innerField.name, 'xds']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入二级装备携带数',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="二级装备物资数量" type="number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={7}>
                                            <Form.Item
                                                {...innerField}
                                                label="数量单位"
                                                name={[innerField.name, 'zbdw']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '请输入二级装备数量单位',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="二级装备物资数量单位" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}>
                                            <MinusCircleOutlined style={{ marginTop: 8 }} onClick={() => remove(innerField.name)} />
                                        </Col>
                                    </Row>

                                ))}
                                <Form.Item>
                                    <Button style={{ marginBottom: 20, width: 200, marginLeft: 103, marginTop: 6 }} type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        新增二级装备物资
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                    }
                </Form.List>
            </Form.Item>
        </div>
    )
}
export default ConactItem