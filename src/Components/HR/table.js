import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { renderComponent } from 'recompose';

const TAX_RATE = 0.07;

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
   // overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },

  // data:this.props.array
});

// const rows = [
//   ['Paperclips (Box)', 100, 1.15],
//   ['Paper (Case)', 10, 45.99],
//   ['Waste Basket', 2, 17.99],
// ].map((row, id) => createRow(id, ...row));

// const invoiceSubtotal = subtotal(rows);
// const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = invoiceTaxes + invoiceSubtotal;

class SpanningTable extends Component {
  constructor(props) {
    super(props)
  alert(props.array)
    this.state = { id:'',
   data:props.array
  }
   
  }
    render(){

  const { classes } =this.props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell numeric>Qty.</TableCell>
            <TableCell numeric>@</TableCell>
            <TableCell numeric>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.data.map(row => {
            return (
              <TableRow key={row.start}>
                <TableCell>{row.start}</TableCell>
                <TableCell numeric>{row.end}</TableCell>
                <TableCell numeric>{row.star}</TableCell>
               
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell numeric>{"ccyFormat(invoiceSubtotal)"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell numeric>{"`${(TAX_RATE * 100).toFixed(0)} %`"}</TableCell>
            <TableCell numeric>{"ccyFormat(invoiceTaxes)"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell numeric>{"ccyFormat(invoiceTotal)"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
   
  );
}
}

SpanningTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SpanningTable);