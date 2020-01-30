import React from 'react';

export default class Iframe extends React.Component {
  render() {
    return (
      <div>
        <iframe src={this.props.src} height={this.props.height} width={this.props.width} className="fullheight" scrolling="no" frameBorder="0" allowTransparency="true" allow="encrypted-media" />
      </div>
    );
  }
}
