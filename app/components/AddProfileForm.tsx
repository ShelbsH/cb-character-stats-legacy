import React from 'react';
import {
  InputText,
  InputSelect
} from '../components/common/CustomForm';
import { Field, Formik, FormikErrors } from 'formik';
import { AvatarUpload } from 'app/components/AvatarUpload';
import { Form, Row, Col, Button, message } from 'antd';
import * as Yup from 'yup';

//TODO: Import formItemPropTypes for type-checking

type NestedObjType<T> = {
  [index: string]: T;
};

type Props = {
  addCharacterProfile: (values: object) => void;
};

type FormProps = {
  values: NestedObjType<string>;
  errors: NestedObjType<FormikErrors<object | string | undefined>>;
  labelCol?: object;
  wrapperCol?: object;
};

const initialValues = {
  name: '',
  alias: '',
  abilities: [],
  powerLevel: '',
  publisher: '',
  powerLevelSelect: ['Street Leveler', 'Powerhouse', 'Skyfather'],
  publisherSelect: ['Marvel', 'DC'],
  abilitiesSelect: []
};

const validation = Yup.object().shape({
  name: Yup.string()
    .min(3)
    .required('The name of the character is required'),
  alias: Yup.string().required("The character's alias is required"),
  abilities: Yup.string().required('At least one tag is required'),
  powerLevel: Yup.string().required(
    'Choosing the power level of the character is required'
  ),
  publisher: Yup.string().required(
    'Publisher for the character is required'
  )
});

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
    md: { span: 4 },
    lg: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 17 },
    lg: { span: 17 }
  }
};

const Fields: React.SFC<FormProps> = ({
  errors,
  values,
  labelCol,
  wrapperCol
}) => (
  <React.Fragment>
    <Field
      component={InputText}
      name="name"
      label="Name"
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      hint="Ex: John or John Doe"
      errorMessage={errors.name}
      type="text"
      hasFeedback
    />
    <Field
      component={InputText}
      name="alias"
      label="Alias"
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      errorMessage={errors.alias}
      type="text"
      hasFeedback
    />
    <Field
      component={InputSelect}
      name="abilities"
      label="Abilities"
      select={values.abilitiesSelect}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      hint="add ability tags"
      errorMessage={errors.abilities}
      mode="tags"
      className="input-tags"
      hasFeedback
      isRequired="true"
    />
    <Field
      component={InputSelect}
      name="powerLevel"
      label="Power Level"
      select={values.powerLevelSelect}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      errorMessage={errors.powerLevel}
      className="input-select"
      hasFeedback
      isRequired="true"
    />
    <Field
      component={InputSelect}
      name="publisher"
      label="Publisher"
      select={values.publisherSelect}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      errorMessage={errors.publisher}
      className="input-select"
      hasFeedback
      isRequired="true"
    />
  </React.Fragment>
);

export class AddProfileForm extends React.Component<Props> {
  onFormSubmit = (values, { resetForm }) => {
    const {
      name,
      alias,
      abilities,
      powerLevel,
      publisher,
      powerLevelSelect,
      publisherSelect
    } = values;
    const { addCharacterProfile } = this.props;

    addCharacterProfile({
      variables: {
        form: {
          name,
          alias,
          abilities,
          powerLevel,
          publisher
        }
      }
    });

    message.success('The form has been submitted');

    /**
     * Reset the entire form, except for the initial select values
     * from the select input
     */

    resetForm({
      powerLevelSelect,
      publisherSelect
    });
  };
  render() {
    const { labelCol, wrapperCol } = formItemLayout;
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={this.onFormSubmit}
      >
        {({ values, errors, handleSubmit }) => (
          <Form layout="horizontal" onSubmit={handleSubmit}>
            <Row>
              <Col lg={12}>
                <Fields
                  errors={errors}
                  values={values}
                  labelCol={labelCol}
                  wrapperCol={wrapperCol}
                />
              </Col>
              <Col lg={12}>
                <AvatarUpload />
              </Col>
            </Row>
            <hr className="characterForm-border" />
            <Form.Item
              wrapperCol={{
                sm: {
                  span: 16,
                  offset: 5
                },
                md: {
                  offset: 4
                },
                lg: {
                  offset: 2
                }
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                className="btnCreate"
                size="large"
              >
                Create Profile
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    );
  }
}
