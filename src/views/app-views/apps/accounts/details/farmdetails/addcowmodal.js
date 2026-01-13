import React, { useEffect } from 'react'
import { Modal, Form, Input, DatePicker, Switch } from 'antd'
import { Select } from 'antd'
const { Option } = Select

const AddCowModal = ({ open, onCancel, onSubmit }) => {
    const [form] = Form.useForm()

    const handleOk = async () => {
        const values = await form.validateFields()
        onSubmit({
            ...values,
            date_of_birth: values.date_of_birth.format('YYYY-MM-DD'),
        })
        form.resetFields()
    }

    useEffect(() => {
        if (!open) form.resetFields()
    }, [open, form])

    const BREEDS = [
        { value: 'friesian', label: 'Friesian' },
        { value: 'ayrshire', label: 'Ayrshire' },
        { value: 'jersey', label: 'Jersey' },
        { value: 'guernsey', label: 'Guernsey' },
        { value: 'boran', label: 'Boran' },
        { value: 'sahiwal', label: 'Sahiwal' },
        { value: 'zebu', label: 'Zebu' },
    ]


    return (
        <Modal
            title="Add Cow"
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            okText="Add Cow"
            destroyOnClose
        >
            <Form layout="vertical" form={form}>
                <Form.Item
                    label="Tag Number"
                    name="tag_number"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="e.g. TAG-00123" />
                </Form.Item>
                <Form.Item
                    label="Cow Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="e.g. Easter" />
                </Form.Item>

                <Form.Item
                    label="Breed"
                    name="breed"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Select breed"
                        options={BREEDS}
                    />
                </Form.Item>
                 <Form.Item
                    label="Date of Birth"
                    name="date_of_birth"
                    rules={[{ required: true }]}
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Pregnant?"
                    name="is_pregnant"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddCowModal
