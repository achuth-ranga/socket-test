import React, { Component } from "react";
import { DATAFORMAT } from "../../constants/DataFormat";

export class MessageFormatType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supportedTypes: [
        {
          type: DATAFORMAT.ASCII.type,
          title: DATAFORMAT.ASCII.title,
        },
        {
          type: DATAFORMAT.HEX.type,
          title: DATAFORMAT.HEX.title,
        },
      ],
      selected: DATAFORMAT.ASCII.type,
    };
  }

  onFormatChange = (type) => {
    this.setState({ selected: type }, this.props.callback(type));
  };

  render() {
    const styles = {
      transform: `scale(1.5)`,
    };
    return (
      <div className="shadow container-fluid p-2 font-weight-bold p-1 m-2">
        <div class="form-check form-check-inline">
          <h5 className="text-left font-weight-bold p-2 m-2">
            {this.props.title}
          </h5>
          {this.state.supportedTypes.map((format) => (
            <div key={format.type} class="form-check form-check-inline">
              <input
                style={styles}
                className="form-check-input m-2"
                type="radio"
                name={format.title}
                id={format.type}
                value={format.type}
                checked={this.state.selected === format.type}
                onChange={() => this.onFormatChange(format.type)}
              />
              <label class="form-check-label">{format.title}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
