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
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { LineChart, AreaChart } from 'react-chartkick'
import 'chart.js'

class Graphs extends React.Component {
    constructor(props) {
        super(props)
    }

    getTitle() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                <Title>
                    {"Type - " + this.props.type + " Chart "}
                    <Link color="inherit" target="_blank" href={"/download/" + this.props.fileData.file_name}>
                        {"File - " + this.props.fileData.file_name + " File Size - " + this.props.size}
                    </Link>
                </Title>
            </Typography>
        );
    }

    render() {
        const classes = makeStyles(theme => ({
            seeMore: {
                marginTop: theme.spacing(3),
            },
        }));
        return (
            <React.Fragment>
                <Title>{this.getTitle()}</Title>
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