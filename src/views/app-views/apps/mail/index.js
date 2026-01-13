import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, DatePicker, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const MilkProduction = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [dataSource, setDataSource] = useState([
		{
			key: 1,
			cowTag: 'COW-001',
			date: '2026-01-10',
			morning: 8,
			evening: 6,
			total: 14,
		},
		{
			key: 2,
			cowTag: 'COW-002',
			date: '2026-01-10',
			morning: 10,
			evening: 7,
			total: 17,
		},
	])

	const columns = [
		{ title: 'Cow Tag', dataIndex: 'cowTag' },
		{ title: 'Date', dataIndex: 'date' },
		{ title: 'Morning (L)', dataIndex: 'morning' },
		{ title: 'Evening (L)', dataIndex: 'evening' },
		{ title: 'Total (L)', dataIndex: 'total' },
	]

	const handleSubmit = values => {
		const total = values.morning + values.evening

		setDataSource(prev => [
			...prev,
			{
				key: prev.length + 1,
				cowTag: values.cowTag,
				date: values.date.format('YYYY-MM-DD'),
				morning: values.morning,
				evening: values.evening,
				total,
			},
		])

		setIsModalOpen(false)
	}

	return (
		<>
			<div className="d-flex justify-content-between mb-3">
				<h3>Milk Production Records</h3>
				<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
					Record Milk
				</Button>
			</div>

			<Table columns={columns} dataSource={dataSource} pagination={false} />

			<Modal
				title="Record Milk Production"
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				footer={null}
			>
				<Form layout="vertical" onFinish={handleSubmit}>
					<Form.Item
						label="Cow Tag"
						name="cowTag"
						rules={[{ required: true, message: 'Cow tag is required' }]}
					>
						<Input placeholder="e.g. COW-003" />
					</Form.Item>

					<Form.Item
						label="Date"
						name="date"
						rules={[{ required: true, message: 'Select date' }]}
					>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item
						label="Morning Milk (Litres)"
						name="morning"
						rules={[{ required: true }]}
					>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item
						label="Evening Milk (Litres)"
						name="evening"
						rules={[{ required: true }]}
					>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>

					<Button type="primary" htmlType="submit" block>
						Save Production
					</Button>
				</Form>
			</Modal>
		</>
	)
}

export default MilkProduction
