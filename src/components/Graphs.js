import Blob from 'blob'
import FormData from 'form-data'
import React from 'react'
import ReactDOM from 'react-dom'
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { LineChart, AreaChart } from 'react-chartkick'
import 'chart.js'

class Graphs extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const classes = makeStyles(theme => ({
            seeMore: {
                marginTop: theme.spacing(3),
            },
        }));
        let title = "Type - " + this.props.type + " Chart " + "File - " + this.props.fileData.file_name
        return (
            <React.Fragment>
                <Title>{title}</Title>
                <Table size="small">
                    <TableBody>
                        {this.props.type == "Line" ? (
                            <LineChart data={this.props.fileData.data} xtitle="Time" ytitle="Value" download={{background: "#fff"}} messages={{empty: "No data"}}  />
                        ) : (
                                <AreaChart data={this.props.fileData.data} xtitle="Time" ytitle="Value" download={{background: "#fff"}} messages={{empty: "No data"}}  />
                            )}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default Graphs;