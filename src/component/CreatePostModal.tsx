import React, { useState } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
const { TextArea } = Input;
interface Values {
	title?: string;
	content?: string;
}

const CreatePostModal: React.FC<{
	open: boolean;
	closeModal: () => void;
	addNewPost: any;
}> = ({ open, closeModal, addNewPost }) => {
	const [form] = Form.useForm();
	const [formValues, setFormValues] = useState<Values>();
	const onCreate = (values: Values) => {
		const payload = { title: values?.title, content: values?.content };
		addNewPost(payload);
		closeModal();
	};

	return (
		<Modal
			open={open}
			title="Create a new collection"
			okText="Create"
			cancelText="Cancel"
			okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
			onCancel={closeModal}
			destroyOnClose
			modalRender={(dom) => (
				<Form
					layout="vertical"
					form={form}
					name="form_in_modal"
					initialValues={{ modifier: 'public' }}
					clearOnDestroy
					onFinish={(values) => onCreate(values)}
				>
					{dom}
				</Form>
			)}
		>
			<Form.Item
				name="title"
				label="Title"
				rules={[
					{
						required: true,
						message: 'Please input the title of collection!',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item name="content" label="Description">
				<TextArea
					showCount
					maxLength={100}
					//   onChange={onChange}
					placeholder="Blog Content"
					style={{ height: 120, resize: 'none' }}
				/>
			</Form.Item>
		</Modal>
	);
};

export default CreatePostModal;
