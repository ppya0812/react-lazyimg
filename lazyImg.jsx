/**
 * image lazyload
 */
import React from 'react'

const ref = 'lazyload'
export default  class LazyImg extends Component {
  static PropTypes = {
    src: PropTypes.string.isRequired
  }

  constructor(props) {
      super(props);
      this.loadImg = this.loadImg.bind(this);
      this.state = {
        buffer: 10
      }
  }

  loadImg () {
    if (!this.props.src) {
      return
    }
    let image = new Image()
    image.onload = () => {
      this.setState({
        src: this.props.src
      })
    }
    image.src = this.props.src
  }

  componentDidMount () {
    const self = this
    self.scrollHandler = () => {
      let buffer = self.props.buffer
      if (self.refs[ref].getBoundingClientRect().top < window.innerHeight + buffer) {
        window.removeEventListener('scroll', self.scrollHandler, true)
        self.loadImg()
      }
    }
    window.addEventListener('scroll', self.scrollHandler, true)
    self.scrollHandler()
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollHandler, true)
    this.scrollHandler = null
  }

  render () {
    return <img src={this.state.src} {...props} ref={ref} />
  }

}
