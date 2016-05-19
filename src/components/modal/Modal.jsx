import React from "react";
import { unmountComponentAtNode, findDOMNode } from "react-dom";

import layout from "../layout.css";
import styles from "../styles.css";

class Modal extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this._unmountSelf = this._unmountSelf.bind(this);
    this._renderChildren = this._renderChildren.bind(this);
  }

  componentWillMount() {
    document.getElementsByTagName("body")[0].classList.add(styles.noscroll);
  }

  _unmountSelf() {
    const node = findDOMNode(this).parentNode;
    unmountComponentAtNode(node);
    node.parentNode.removeChild(node);
    document.getElementsByTagName("body")[0].classList.remove(styles.noscroll);
  }

  _renderChildren() {
    return React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, {
        _unmountSelf: this._unmountSelf
      });
    }, this);
  }

  render() {
    return (
      <div className={layout.modal}>
        <div className={layout.overlay} onClick={this._unmountSelf}/>
        <div className={layout["contents-wrapper"]}>
          <div className={layout.contents}>
            {this._renderChildren()}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
