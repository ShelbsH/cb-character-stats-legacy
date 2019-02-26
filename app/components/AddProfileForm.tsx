import React from 'react';
import {
  InputText,
  InputSelect
} from '../components/common/CustomForm';
import { Field, Formik, FormikErrors } from 'formik';
import {
  Form,
  Row,
  Col,
  Button,
  message,
  Icon,
  Modal,
  Upload
} from 'antd';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import * as Yup from 'yup';

//TODO: Import formItemPropTypes for type-checking

type NestedObjType<T> = {
  [index: string]: T;
};

type Props = {
  addCharacterProfile: (values: object) => void;
  isSuccess?: boolean;
};

type FormProps = {
  values: NestedObjType<string>;
  errors: NestedObjType<FormikErrors<object | string | undefined>>;
  labelCol?: object;
  wrapperCol?: object;
};

type Image = {
  imgUrl: string;
  croppedImageUrl: null | string;
  blobFile: null | File;
  imageName: string;
  imageType: string;
};

type State = {
  image: Image;
  isVisible: boolean;
  crop: Crop;
};

const initialState = {
  image: {
    imgUrl: '',
    croppedImageUrl: null,
    blobFile: null,
    imageName: '',
    imageType: ''
  },
  isVisible: false,
  crop: {
    x: 0,
    y: 0,
    width: 30,
    aspect: 1
  }
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

const uploadButton = (
  <div>
    <Icon type="plus" className="avatar-icon" />
    <div className="avatar-uploadText">Upload</div>
  </div>
);

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

export class AddProfileForm extends React.Component<Props, State> {
  fileUrl!: string;
  imageRef!: HTMLImageElement;

  state: State;

  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidUpdate(prevProps) {
    const { isSuccess } = prevProps;

    //Reset the avatar upon successful completion.
    if (isSuccess === true) {
      //Reset the Avatar image preview/crop upon successful submission
      this.setState({
        image: initialState.image
      });

      message.success('The form has been submitted');
    }
  }

  onModalCancel = () => {
    const { image } = this.state;
    this.setState({
      isVisible: false,
      image: {
        ...image,
        croppedImageUrl: null
      }
    });
  };

  onModalOk = () => {
    const { imgUrl, croppedImageUrl } = this.state.image;

    if (imgUrl && croppedImageUrl) {
      this.setState({
        isVisible: false
      });

      this.croppedImgToBlob(croppedImageUrl);
    }
  };

  onBeforeUpload = (file: Blob) => {
    const fileTypes = /^image\/(jpeg|jpg|png)$/;

    //Acceptable image file types
    if (!fileTypes.test(file.type)) {
      message.error(
        'Only .jpeg, jpg, and .png file types are accepted'
      );
    }

    return fileTypes.exec(file.type) === null;
  };

  onImageChange = ({ file }) => {
    const { crop, image } = initialState;
    const { name, type } = file;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      let result = fileReader.result as string;

      this.setState({
        isVisible: true,
        image: {
          ...image,
          imgUrl: result,
          imageName: name,
          imageType: type
        }
      });
    };

    fileReader.readAsDataURL(file);

    this.setState({
      crop
    });
  };

  onImageResize = crop => {
    this.setState({
      crop
    });
  };

  makeClientCrop = async (crop: Crop, pixelCrop: PixelCrop) => {
    if (this.imageRef && crop.width) {
      const { image } = this.state;
      const croppedImageUrl = (await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg'
      )) as string;

      this.setState({
        image: {
          ...image,
          croppedImageUrl
        }
      });
    }
  };

  onImageLoaded: any = (
    image: HTMLImageElement,
    pixelCrop: PixelCrop
  ) => {
    const { crop } = this.state;

    this.imageRef = image;
    this.makeClientCrop(crop, pixelCrop);
  };

  getCroppedImg(
    image: HTMLImageElement,
    pixelCrop: PixelCrop,
    fileName: string
  ): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
    }

    return new Promise(resolve => {
      const {
        image: { imageType }
      } = this.state;

      canvas.toBlob(blob => {
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, imageType);
    });
  }

  onCropComplete = (crop: Crop, pixelCrop: PixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  croppedImgToBlob = async (blobUrl: string): Promise<void> => {
    return await fetch(blobUrl).then(data => {
      data.blob().then(result => {
        const {
          image,
          image: { imageName }
        } = this.state;

        this.setState({
          image: {
            ...image,
            blobFile: new File([result], imageName, {
              type: result.type
            })
          }
        });
      });
    });
  };

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
    const {
      image: { blobFile }
    } = this.state;

    addCharacterProfile({
      variables: {
        form: {
          name,
          alias,
          abilities,
          powerLevel,
          publisher,
          imageUpload: blobFile
        }
      }
    });

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
    const { isVisible, crop } = this.state;
    const { croppedImageUrl, imgUrl } = this.state.image;

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
                <div className="upload-container">
                  <Modal
                    title="Crop Image"
                    visible={isVisible}
                    onCancel={this.onModalCancel}
                    onOk={this.onModalOk}
                    maskClosable={false}
                  >
                    {imgUrl && (
                      <ReactCrop
                        src={imgUrl}
                        onChange={this.onImageResize}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        crop={crop}
                        minWidth={30}
                      />
                    )}
                  </Modal>
                  <Upload
                    name="avatar"
                    className="avatar-uploader"
                    listType="picture-card"
                    multiple={false}
                    beforeUpload={this.onBeforeUpload}
                    showUploadList={false}
                    onChange={this.onImageChange}
                  >
                    {croppedImageUrl && !isVisible ? (
                      <img
                        src={croppedImageUrl}
                        className="croppedImage"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                  <p>
                    Upload image for avatar (<i>optional</i>)
                  </p>
                </div>
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
