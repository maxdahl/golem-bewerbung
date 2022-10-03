class BaseComponent {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  setState(key, value) {
    this.state[key] = value;
    this.render();
  }

  render() {
    throw new Error("Function render is not implemented");
  }
}

export default BaseComponent;
