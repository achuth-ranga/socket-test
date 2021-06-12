import React, { Component } from "react";

export class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    };
  }

  handleChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  sendData = (e) => {
    let that = this;
    let data = this.state.msg;
    this.setState({ msg: "" }, function () {
      that.props.callback(data);
    });
  };

  render() {
    const style = {
      minWidth: "100%",
    };
    return (
      <div className="shadow container-fluid p-2 m-2">
        <h4 className="text-left text-white bg-info p-1">{this.props.title}</h4>
        <form className="p-3 bg-light-gray">
          <div className="form-group row">
            <div className="p-1">
              <textarea
                type="text"
                className="form-control col-xs-12"
                rows="7"
                cols="50"
                style={style}
                id="host"
                value={this.state.msg}
                onChange={this.handleChange}
              />
            </div>

            <div className="p-3">
              <button
                type="button"
                className="btn btn-info btn-lg"
                disabled={this.props.disable}
                onClick={this.sendData}
              >
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
