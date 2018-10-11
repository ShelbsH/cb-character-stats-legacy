import React from "react";
import "styles/components/main.scss";

export class Main extends React.Component<{ message: string }> {
  render() {
    const { message } = this.props;

    return (
      <div className="app-root">
        <h1 className="title">React Boilerplate</h1>
        <p className="description">
          Start developing React apps with this boilerplate using{" "}
          <span>
            <b>{message}</b>
          </span>
        </p>
      </div>
    );
  }
}
