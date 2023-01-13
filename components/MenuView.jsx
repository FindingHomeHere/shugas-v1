import React, { PureComponent } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import throttle from 'lodash.throttle';
import { Box } from '@chakra-ui/react';

class MenuView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { width: null };
    this.throttledSetDivSize = throttle(this.setDivSize, 500);
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }

  componentDidMount() {
    console.log(pdfjs.version);
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
  return (
    <>
      <Document
        file={doc.data.fileName}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.apply(null, Array(numPages))
          .map((_, i) => i + 1)
          .map((page) => (
            <Box
              key={page}
              style={{
                marginBottom: '8px',
                marginTop: page === 1 ? '8px' : '0',
              }}
            >
              <Page pageNumber={page} width={wrapperDivSize} />
            </Box>
          ))}
      </Document>
    </>
  );
};

export default MenuView;
