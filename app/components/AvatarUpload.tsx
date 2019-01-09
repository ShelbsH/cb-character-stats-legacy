import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

type State = {
  imgUrl: string | ArrayBuffer | null;
  isVisible: boolean;
  crop: Crop;
  croppedImageUrl: null | string;
};

const uploadButton = (
  <div>
    <Icon type="plus" className="avatar-icon" />
    <div className="avatar-uploadText">Upload</div>
  </div>
);

export class AvatarUpload extends React.Component<{}, State> {
  fileUrl!: string;
  imageRef!: object;

  state: State = {
    imgUrl: '',
    isVisible: false,
    crop: {
      x: 0,
      y: 0,
      width: 30,
      aspect: 1
    },
    croppedImageUrl: null
  };

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

    if (fileTypes.test(file.type)) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.setState({
          imgUrl: fileReader.result,
          isVisible: true
        });
      };

      fileReader.readAsDataURL(file);
    } else {
      message.error('Only .jpeg and .png file types are accepted');
    }

    return false;
  };

  onImageChange = () => {
    /**
     * TODO: Place the FileReader() API here.
     * Reset the crop state on every image change
     */
  };

  onImageResize = crop => {
    this.setState({
      crop
    });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = (await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg'
      )) as string;
      this.setState({ croppedImageUrl });
    }
  }

  onImageLoaded: any = (
    image: HTMLImageElement,
    pixelCrop: PixelCrop
  ) => {
    this.imageRef = image;

    // Make the library regenerate aspect crops if loading new images.
    const { crop } = this.state;

    if (crop.height && crop.width) {
      this.setState({
        crop: { ...crop }
      });
    } else {
      this.makeClientCrop(crop, pixelCrop);
    }
  };

  getCroppedImg(image, pixelCrop, fileName) {
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
      canvas.toBlob((blob: any) => {
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  onCropComplete = (crop, pixelCrop) => {
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
              src={imgUrl as string}
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
