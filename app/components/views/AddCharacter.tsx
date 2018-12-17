import React from 'react';
import { Mutation } from 'react-apollo';
import { ADD_CHARACTER } from 'app/queries';
import { RootView } from 'app/components/common/RootView';
import { Formik, Field } from 'formik';
import {
  InputText,
  InputSelect
} from 'app/components/common/CustomForm';
import * as Yup from 'yup';
import { Row, Col, Form, Button, Upload, Icon, message } from 'antd';

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

const tailFormItemLayout = {
  wrapperCol: {
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
  }
};

const uploadButton = (
  <div>
    <Icon type="plus" className="avatar-icon" />
    <div className="avatar-uploadText">Upload</div>
  </div>
);

/**
 * TODO: Refactor all of this code
 */

export class AddCharacter extends React.Component {
  render() {
    const { labelCol, wrapperCol } = formItemLayout;
    return (
      <RootView>
        <h1>Create Character Profile</h1>
        <div className="characterForm">
          <Mutation mutation={ADD_CHARACTER}>
            {addCharacterProfile => {
              return (
                <Formik
                  initialValues={initialValues}
                  validationSchema={validation}
                  validateOnChange={false}
                  validateOnBlur={false}
                  onSubmit={values => {
                    //TODO: Reset the form after successful submission

                    const {
                      name,
                      alias,
                      abilities,
                      powerLevel,
                      publisher
                    } = values;
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

                    message.info('Your form has been submitted');
                  }}
                >
                  {({ values, errors, handleSubmit }) => (
                    <Form layout="horizontal" onSubmit={handleSubmit}>
                      <Row>
                        <Col lg={12}>
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
                          />
                        </Col>
                        <Col lg={12}>
                          <div className="upload-container">
                            <Upload
                              name="avatar"
                              className="avatar-uploader"
                              listType="picture-card"
                              multiple={false}
                            >
                              {uploadButton}
                            </Upload>
                            <p>
                              Upload image for avatar (<i>optional</i>
                              )
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <hr className="characterForm-border" />
                      <Form.Item {...tailFormItemLayout}>
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
            }}
          </Mutation>
        </div>
      </RootView>
    );
  }
}
