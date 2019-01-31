import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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

  render() {
    const { isVisible, crop } = this.state;
    const { croppedImageUrl, imgUrl } = this.state.image;

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
