import React from 'react';
import { Form, Input, Select } from 'antd';

type FormItemProps = {
  label: string;
  isError: boolean;
  labelCol: object;
  wrapperCol: object;
  hasFeedback: boolean;
  errorMessage: string;
  hint: string;
};

type NestedObjects<T> = {
  [index: string]: T;
};

type FieldProps<T extends NestedObjects<T>> = {
  errors: T;
  field: T;
  select: any;
  form: any;
  name: string;
  type: string;
};

type All = FormItemProps & FieldProps<any>;

const withFormType = <T extends object>(
  Component: React.ComponentType
) =>
  class WithFormType extends React.Component<T & All> {
    onChange = (value: string) => {
      const {
        form,
        field: { name }
      } = this.props;

      form.setFieldValue(name, value);
    };

    onInputChange = (evt: React.FormEvent<HTMLInputElement>) => {
      const {
        form,
        field: { name }
      } = this.props;

      form.setFieldValue(name, evt.currentTarget.value);
    };

    onBlur = () => {
      const {
        form,
        field: { name }
      } = this.props;

      form.setFieldTouched(name, true);
    };

    render() {
      const {
        label,

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
      } = this.props;

      const Option = Select.Option;
      const FormItem = Form.Item;
      const isError = form.errors[field.name];

      const eventChange = type ? this.onInputChange : this.onChange;

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
            onBlur={this.onBlur}
          >
            {select &&
              select.map((name, index) => (
                <Option key={index}>{name}</Option>
              ))}
          </Component>
        </FormItem>
      );
    }
  };

export const InputText = withFormType(Input);
export const InputSelect = withFormType(Select);
