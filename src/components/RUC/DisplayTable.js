import React, { Component } from "react";

export class DisplayTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="shadow p-2 m-2">
        <h4 className="text-left text-white bg-info p-2">{this.props.title}</h4>
        <table className="table table-responsive-lg  table-sm table-bordered table-striped">
          <thead className="bg-secondary text-white font-weight-bold font-size-bigger">
            <tr>
              <th>DATE</th>
              <th>MESSAGE</th>
            </tr>
          </thead>
          {/* <colgroup>
            <col className="col-md-2" />
            <col className="col-md-8" />
          </colgroup> */}
          <tbody className="align-self-lg-end">
            {this.props.data.map((data) => (
              <tr key={data.time}>
                <td>{data.time}</td>
                <td>{data.msg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
