import React, { PureComponent } from 'react';
import './screen.less';

export default class Screen extends PureComponent {

  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,
      frameBounds: null
    };
  }

  get rate() {
    /**
     * iOS: bounds width = 320, image width = 640
     * Android: bounds width = 720, image width = 720
     */
    return this.props.isIOS ? 2 : 1;
  }

  handleImageLoad() {
    this.setState({
      width: this.refs.image.naturalWidth,
      height: this.refs.image.naturalHeight,
    });
    this.initCanvas();
  }

  displayWidth() {
    return 320; // css client width
  }

  paintFrame(frameBounds, style) {
    const rate = this.rate;
    const cxt = this.cxt;
    cxt.clearRect(0, 0, this.state.width, this.state.height);
    if (!frameBounds) return;

    cxt.fillStyle = 'red';
    cxt.globalAlpha = 0.5;
    const { leftTop, rightBottom } = frameBounds;

    cxt.fillRect(
      leftTop.x * rate,
      leftTop.y * rate,
      (rightBottom.x * rate - leftTop.x * rate),
      (rightBottom.y * rate - leftTop.y * rate)
    );
  }

  handleClick(e) {
    const rate = this.rate;
    const scale = this.state.width / this.displayWidth();

    this.props.onClick(
      (e.clientX - this.canvas.offsetLeft) * scale / rate,
      (e.clientY - this.canvas.offsetTop )* scale / rate
    );
  }

  initCanvas() {
    const canvas = this.refs.canvas;
    this.cxt = canvas.getContext('2d');
    this.canvas = canvas;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.frame !== this.props.frame && this.cxt) {
      this.paintFrame(nextProps.frame);
    }
    return this.state !== nextState;
  }

  render() {
    return (
      <div className="screen">
        <canvas
          width={this.state.width}
          height={this.state.height}
          onClick={this.handleClick.bind(this)}
          onMouseDown={e => e.preventDefault()}
          ref="canvas"
        />
        <img ref="image"
          onLoad={this.handleImageLoad.bind(this)}
          src={this.props.src}
        />
      </div>
    );
  }

};

Screen.defaultProps = {
  onClick() {},
  frame: null,
  isIOS: true
};