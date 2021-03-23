import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

//TODO: implement nicer image upload experience
//https://www.npmjs.com/package/react-images-upload

//TODO: send image on submit to backend route

const getToken = () => window.localStorage.getItem('token');
const upload = async (formData) => {
  const token = getToken();
  axios.post('/api/users/upload', formData);
};

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const files = Array.from(ev.target.files);
    console.log(files);
    let formData = new FormData();
    formData('file', files[0]);
    console.log(formData);
    upload(formData);
  }
  render() {
    const { account } = this.props;
    return (
      <div>
        <form
          className="addPhotoForm"
          id="addPhoto"
          onSubmit={this.handleSubmit}
        >
          <input accept="image/*" type="file" />
          <button type="Submit">Submit</button>
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    account: state.auth,
  };
};

export default connect(mapState, (dispatch) => {
  return {};
})(ImageUpload);
