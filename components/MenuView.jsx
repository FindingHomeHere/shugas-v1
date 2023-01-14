import React, { PureComponent } from 'react';
import dynamic from 'next/dynamic';
import { pdfjs } from 'react-pdf';
import throttle from 'lodash.throttle';
const PdfComponent = dynamic(import('./PdfComponent'), { ssr: false });

class MenuView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { width: null };
    this.throttledSetDivSize = throttle(this.setDivSize, 500);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

  componentDidMount() {
    this.setDivSize();
    window.addEventListener('resize', this.throttledSetDivSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledSetDivSize);
  }

  setDivSize = () => {
    this.setState({ width: this.pdfWrapper.getBoundingClientRect().width });
  };

  render() {
    return (
      <div
        id='row'
        style={{
          width: '90vw',
          display: 'flex',
          overflowX: 'hidden',
        }}
      >
        <div
          id='placeholderWrapper'
          style={{
            height: '100vh',
          }}
        />
        <div
          id='pdfWrapper'
          style={{
            width: '90vw',
          }}
          ref={(ref) => (this.pdfWrapper = ref)}
        >
          <PdfComponent
            doc={this.props.data}
            wrapperDivSize={this.state.width}
          />
        </div>
      </div>
    );
  }
}

export default MenuView;
