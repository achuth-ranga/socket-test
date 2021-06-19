import React, { Component } from "react";

export class ConnectionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: this.props.host,
      port: this.props.port,
    };
  }

  onHostChange = (event) => {
    this.setState({
      host: event.target.value,
    });
  };

  onPortChange = (event) => {
    this.setState({
      port: event.target.value,
    });
  };

  render() {
    return (
      <div className="shadow container-fluid p-2 m-2">
         <h4 className="text-left text-white bg-info p-1">{this.props.title}</h4>
        <form className="m-lg-3 bg-light-gray" action="">
          <div className="form-group row">
            <label className="col-sm-0 col-form-label font-weight-bold">Host</label>
            <div className="p-1">
              <input
                type="text"
                className="form-control"
                id="host"
                placeholder={this.state.host}
                onChange={this.onHostChange}
              />
            </div>
            <label className="col-sm-0 col-form-label font-weight-bold">Port</label>
            <div className="p-1 col-md-1">
              <input
                type="number"
                className="form-control"
                id="host"
                placeholder={this.state.port}
                onChange={this.onPortChange}
              />
            </div>
            <div className="p-1">
              <button
                disabled={this.props.disabled}
                type="button"
                className="btn btn-info btn-lg form-control"
                onClick={() => this.props.callback(this.state.host, this.state.port)}
              >
                {this.props.text}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
