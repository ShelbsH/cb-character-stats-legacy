import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type State = {
  imgUrl: string | null;
  isVisible: boolean;
  crop: Crop;
  croppedImageUrl: null | string;
};

const initialState = {
  imgUrl: '',
  isVisible: false,
  crop: {
    x: 0,
    y: 0,
    width: 30,
    height: 30,
    aspect: 1
  },
  croppedImageUrl: null
};

const uploadButton = (
  <div>
    <Icon type="plus" className="avatar-icon" />
    <div className="avatar-uploadText">Upload</div>
  </div>
);

export class AvatarUpload extends React.Component<{}, State> {
  fileUrl!: string;
  imageRef!: HTMLImageElement;

  state: State;

  constructor(props) {
    super(props);

    this.state = initialState;
  }

  onModalCancel = () => {
    this.setState({
      isVisible: false,
      croppedImageUrl: null
    });
  };

  onModalOk = () => {
    const { imgUrl } = this.state;

    if (imgUrl) {
      this.setState({
        isVisible: false
      });
    }
  };

  onBeforeUpload = (file: Blob) => {
    const fileTypes = /^image\/(jpeg|png)$/;

    if (!fileTypes.test(file.type)) {
      message.error('Only .jpeg and .png file types are accepted');
    }

    return fileTypes.exec(file.type) === null;
  };

  onImageChange = ({ file }) => {
    const { crop } = initialState;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      let result = fileReader.result as string;
      this.setState({
        imgUrl: result,
        isVisible: true
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

  async makeClientCrop(crop: Crop, pixelCrop: PixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = (await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg'
      )) as string;
      this.setState({ croppedImageUrl });
    }
  }

  onImageLoaded = (image: HTMLImageElement, pixelCrop: PixelCrop) => {
    this.imageRef = image;

    // Make the library regenerate aspect crops if loading new images.
    const { crop } = this.state;

    if (crop.height && crop.width) {
      this.setState({
        crop: { ...crop, height: undefined }
      });
    } else {
      this.makeClientCrop(crop, pixelCrop);
    }
  };

  getCroppedImg(
    image: HTMLImageElement,
    pixelCrop: PixelCrop,
    fileName: string
  ) {
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
      canvas.toBlob(blob => {
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  onCropComplete = (crop: Crop, pixelCrop: PixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  render() {
    const { croppedImageUrl, imgUrl, isVisible, crop } = this.state;

    return (
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
            <img src={croppedImageUrl} className="croppedImage" />
          ) : (
            uploadButton
          )}
        </Upload>
        <p>
          Upload image for avatar (<i>optional</i>)
        </p>
      </div>
    );
  }
}
