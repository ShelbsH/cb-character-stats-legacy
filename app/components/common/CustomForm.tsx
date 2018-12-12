import React from 'react';
import { Form, Input, Select } from 'antd';

const Option = Select.Option;

const customFormType = Component => ({
  label,
  values,
  errors,
  errorMessage,
  hint,
  field,
  select,
  labelCol,
  wrapperCol,
  form,
  name,
  type,
  hasFeedback,
  ...rest
}) => {
  const FormItem = Form.Item;
  const isError = form.errors[field.name];
  const onChange = value => form.setFieldValue(field.name, value);
  const onInputChange = evt =>
    form.setFieldValue(field.name, evt.target.value);
  const eventChange = type ? onInputChange : onChange;
  const onBlur = () => form.setFieldTouched(field.name, true);

  return (
    <FormItem
      label={label}
      validateStatus={isError ? 'error' : undefined}
      help={isError ? errorMessage : hint}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      hasFeedback={hasFeedback}
    >
      <Component
        {...field}
        {...rest}
        onChange={eventChange}
        onBlur={onBlur}
      >
        {select &&
          select.map((name, index) => {
            return <Option key={index}>{name}</Option>;
          })}
      </Component>
    </FormItem>
  );
};

export const InputText = customFormType(Input);
export const InputSelect = customFormType(Select);
