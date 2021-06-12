import React, { Component } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <PacmanLoader
        css={override}
        size={30}
        margin={2}
        color={"#36D7B7"}
        loading={this.state.loading}
        speedMultiplier={1.5}
      />
    );
  }
}
