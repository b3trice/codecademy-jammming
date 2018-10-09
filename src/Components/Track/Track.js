import React from 'react';
import './Track.css'

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
  }
  renderAction(isRemoval) {
    if (isRemoval) {
      return "-";
    }
    return "+";
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3> {/* track name will go here */ } </h3>
          <p> { /* track artist will go here |  track album will go here */ } </p>
        </div>
        <a className="Track-action">{this.renderAction(this.props.track.isRemoval)}</a>
      </div>
    )
  }
}

export default Track;
