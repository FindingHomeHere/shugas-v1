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
  const [numPages, setNumPages] = React.useState([]);
  const { doc, wrapperDivSize } = props;
  console.log(doc.data.fileName);
  return (
    <div>
      <Document
        file={doc.data.fileName}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        renderMode='svg'
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => (
            <div
              key={page}
              style={{
                marginBottom: '8px',
                marginTop: page === 1 ? '8px' : '0',
              }}
            >
              <Page pageNumber={page} width={wrapperDivSize} />
            </div>
          ))}
      </Document>
    </div>
  );
};

export default MenuView;
