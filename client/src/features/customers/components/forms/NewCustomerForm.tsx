import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Input, Row, Col, Button, Form, Space, Checkbox, message } from 'antd';
import { createCustomer } from '../../redux/customerSlice';
import NewCustomerSchema from '../../validations/newCustomerSchema.validation';
import { NEW_CUSTOMERS_FIELDS } from '../../constants/fields';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';

const onChange = (e: CheckboxChangeEvent) => {
     console.log(`checked = ${e.target.checked}`);
};

const { TextArea } = Input;

interface FormErrors {
     [key: string]: string;
}

const NewCustomerForm: React.FC = () => {
     const [formErrors, setFormErrors] = useState<FormErrors>({});
     const formDataRef = useRef<Record<string, string | number | readonly string[] | undefined>>({});
     const dispatch: ThunkDispatch<{}, {}, AnyAction> = useDispatch();

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
          const { value } = e.target;
          if (typeof fieldName === 'string') {
               formDataRef.current[fieldName] = value;
          }
     };

     const handleSubmit = async () => {
          try {
               await NewCustomerSchema.validate(formDataRef.current, { abortEarly: false });
               setFormErrors({}); // Clear any previous errors
               await dispatch(createCustomer(formDataRef.current));
          } catch (error: any) {
               const errors: FormErrors = {};
               error.inner?.forEach((err: any) => {
                    errors[err.path] = err.message;
               });
               setFormErrors(errors);
               message.error('Please fix the form errors.');
          }
     };
     const onMenuClick: MenuProps['onClick'] = (e) => {
          console.log('click', e);
     };
     const items = [
          {
               key: '1',
               label: 'Create and send email',
          },
          {
               key: '2',
               label: 'Save as draft',
          },
     ];

     const wrapperCol = { offset: 2, span: 16 }

     return (
          <Form
               labelAlign='left'
               labelCol={{ span: 6 }}
               wrapperCol={{ span: 16 }}
               layout="inline"
               requiredMark={true}
               scrollToFirstError={true}
               initialValues={{ remember: true }}
          // colon={false}
          >
               <Row gutter={[16, 8]}>
                    {NEW_CUSTOMERS_FIELDS?.map(({ name, placeholder, required, allowClear, defaultValue }, index) => (
                         <Col key={index} span={14}>
                              {placeholder === 'Notes' ? (
                                   <Form.Item
                                        label={formErrors[name] ? <span style={{ color: 'red' }}>{placeholder}</span> : placeholder}
                                        name={name}
                                        rules={[{ required: required, message: `${placeholder} is required` }]}
                                        wrapperCol={wrapperCol}
                                        required={required}
                                        tooltip="This is a required field"
                                   >
                                        <TextArea
                                             size='large'
                                             name={name}
                                             className={formErrors[name] ? 'error' : ''}
                                             required={required}
                                             placeholder={formErrors[name] ? formErrors[name] : placeholder}
                                             allowClear={allowClear}
                                             onChange={(e) => handleInputChange(e, name)}
                                        />
                                   </Form.Item>
                              ) : (
                                   <Form.Item
                                        // help={false}
                                        label={formErrors[name] ? <span style={{ color: 'red' }}>{placeholder}</span> : placeholder}
                                        name={name}
                                        rules={[{ required: required, message: `${placeholder} is required` }]}
                                        wrapperCol={wrapperCol}
                                        required={required}
                                        tooltip="This is a required field"
                                   >
                                        <Input
                                             size='large'
                                             name={name}
                                             status={formErrors[name] ? 'error' : ''}
                                             required={required}
                                             placeholder={formErrors[name] ? formErrors[name] : placeholder}
                                             allowClear={allowClear}
                                             addonBefore={defaultValue === 'mysite' && 'https://'}
                                             onChange={(e) => handleInputChange(e, name)}
                                        />
                                   </Form.Item>
                              )}
                              {/* {formErrors[name] && (
                                   <div className='my-2' style={{ color: 'red' }}>{formErrors[name]}</div>
                              )} */}
                         </Col>
                    ))}
               </Row>

               <div className='create-customer-button-container  flex flex-col gap-3 '>
                    <Dropdown.Button trigger={['click']} type='primary' onClick={handleSubmit} menu={{ items, onClick: onMenuClick }}>Create</Dropdown.Button>
                    {/* <div>
                         <Button size='large' type='primary' onClick={handleSubmit}>
                              Create
                         </Button>
                    </div> */}
               </div>
          </Form>
     );
};

export default NewCustomerForm;
