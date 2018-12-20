import React from 'react';
import { Upload, Icon } from 'antd';

const uploadButton = (
  <div>
    <Icon type="plus" className="avatar-icon" />
    <div className="avatar-uploadText">Upload</div>
  </div>
);

export class AvatarUpload extends React.Component {
  state = {
    imgUrl: null
  };

  onBeforeUpload = file => {
    let fileReader = new FileReader();

    fileReader.onload = () => {
      this.setState({
        imgUrl: fileReader.result
      });
    };
    fileReader.readAsBinaryString(file);
    return false;
  };

  render() {
    return (
      <div className="upload-container">
        <Upload
          name="avatar"
          className="avatar-uploader"
          listType="picture-card"
          multiple={false}
          beforeUpload={this.onBeforeUpload}
        >
          {uploadButton}
        </Upload>
        <p>
          Upload image for avatar (<i>optional</i>)
        </p>
      </div>
    );
  }
}
