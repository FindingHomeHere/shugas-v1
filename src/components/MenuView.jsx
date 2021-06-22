import React, { PureComponent } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import throttle from 'lodash.throttle';

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

const PdfComponent = (props) => {
  const { doc, wrapperDivSize } = props;
  return (
    <div>
      <Document file={`/uploads/menus/${doc}`} renderMode='svg'>
        <div style={{ marginBottom: '8px' }} />
        <Page pageIndex={0} width={wrapperDivSize} />
        <div style={{ marginBottom: '8px' }} />
        <Page pageIndex={1} width={wrapperDivSize} />
        <div style={{ marginBottom: '8px' }} />
        <Page pageIndex={2} width={wrapperDivSize} />
        <div style={{ marginBottom: '8px' }} />
      </Document>
    </div>
  );
};

export default MenuView;
