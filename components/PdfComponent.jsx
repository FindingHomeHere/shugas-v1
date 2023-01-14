import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Box } from '@chakra-ui/react';

const PdfComponent = (props) => {
  const [numPages, setNumPages] = useState(null);
  const { doc, wrapperDivSize } = props;
  return (
    <>
      <Document
        file={doc.data.fileName}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        renderMode='svg'
      >
        {Array.apply(null, Array(numPages))
          .map((_, i) => i + 1)
          .map((page) => (
            <Box key={page} mb='8px' mt={page === 1 ? '8px' : '0'}>
              <Page pageNumber={page} width={wrapperDivSize} />
            </Box>
          ))}
      </Document>
    </>
  );
};

export default PdfComponent;
