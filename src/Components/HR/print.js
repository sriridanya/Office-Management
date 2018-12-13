import React from 'react';
import ReactDOM from 'react-dom';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
//import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

import products from './products.json';

class App extends React.Component {
    pdfExportComponent;
    grid;

    constructor(props) {
        super(props);
        this.state = {
            gridData: products
        };
    }

    render() {
        return (
            <div>
                <div className="example-config">
                    <button className="k-button" onClick={this.exportPDFWithComponent}>Export with component</button>
                    &nbsp;
                    <button className="k-button" onClick={this.exportPDFWithMethod}>Export with method</button>
                </div>

                <PDFExport ref={(component) => this.pdfExportComponent = component} paperSize="A4">
                   <h1>hhi</h1>
                </PDFExport>
            </div>
        );
    }

    exportPDFWithMethod = () => {
        savePDF(ReactDOM.findDOMNode(this.grid), { paperSize: 'A4' });
    }
    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }
}

export default App