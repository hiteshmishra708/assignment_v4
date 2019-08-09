import axios from 'axios'
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
        let abc = [{ "ts": 1424514943000, "val": 68 }, { "ts": 1424514953000, "val": 72 }, { "ts": 1424514963000, "val": 33 }, { "ts": 1424514973000, "val": 83 }, { "ts": 1424514983000, "val": 43 }, { "ts": 1424514993000, "val": 70 }, { "ts": 1424515003000, "val": 84 }, { "ts": 1424515013000, "val": 56 }, { "ts": 1424515023000, "val": 63 }, { "ts": 1424515033000, "val": 38 }, { "ts": 1424515043000, "val": 39 }, { "ts": 1424515053000, "val": 99 }, { "ts": 1424515063000, "val": 64 }, { "ts": 1424515073000, "val": 65 }, { "ts": 1424515083000, "val": 37 }, { "ts": 1424515093000, "val": 87 }, { "ts": 1424515103000, "val": 59 }, { "ts": 1424515113000, "val": 60 }, { "ts": 1424515123000, "val": 87 }, { "ts": 1424515133000, "val": 43 }, { "ts": 1424515143000, "val": 97 }, { "ts": 1424515153000, "val": 87 }, { "ts": 1424515163000, "val": 52 }, { "ts": 1424515173000, "val": 54 }, { "ts": 1424515183000, "val": 38 }, { "ts": 1424515193000, "val": 61 }, { "ts": 1424515203000, "val": 50 }, { "ts": 1424515213000, "val": 92 }, { "ts": 1424515223000, "val": 30 }, { "ts": 1424515233000, "val": 50 }, { "ts": 1424515243000, "val": 99 }, { "ts": 1424515253000, "val": 52 }, { "ts": 1424515263000, "val": 44 }, { "ts": 1424515273000, "val": 66 }, { "ts": 1424516313000, "val": 71 }, { "ts": 1474514503000, "val": 42 }, { "ts": 1474514513000, "val": 95 }, { "ts": 1474514523000, "val": 57 }, { "ts": 1474514533000, "val": 80 }, { "ts": 1474514543000, "val": 66 }, { "ts": 1474514553000, "val": 64 }, { "ts": 1474514563000, "val": 54 }, { "ts": 1474514573000, "val": 97 }, { "ts": 1474514583000, "val": 59 }, { "ts": 1474514593000, "val": 38 }, { "ts": 1474514603000, "val": 67 }, { "ts": 1474514613000, "val": 31 }, { "ts": 1474514623000, "val": 34 }, { "ts": 1474514633000, "val": 77 }, { "ts": 1474514643000, "val": 45 }, { "ts": 1474514653000, "val": 34 }, { "ts": 1474514663000, "val": 78 }, { "ts": 1474514673000, "val": 69 }, { "ts": 1474514683000, "val": 99 }, { "ts": 1474514693000, "val": 90 }, { "ts": 1474514703000, "val": 78 }, { "ts": 1474514713000, "val": 88 }, { "ts": 1474514723000, "val": 74 }, { "ts": 1474514733000, "val": 33 }, { "ts": 1474514743000, "val": 90 }, { "ts": 1474514753000, "val": 59 }, { "ts": 1474514763000, "val": 94 }, { "ts": 1474514773000, "val": 56 }, { "ts": 1474514783000, "val": 99 }, { "ts": 1474514793000, "val": 97 }, { "ts": 1474514803000, "val": 52 }, { "ts": 1474514813000, "val": 53 }, { "ts": 1474514823000, "val": 31 }, { "ts": 1474514833000, "val": 77 }, { "ts": 1474514843000, "val": 83 }, { "ts": 1474514853000, "val": 44 }, { "ts": 1474514863000, "val": 59 }, { "ts": 1474514873000, "val": 79 }, { "ts": 1474514883000, "val": 41 }, { "ts": 1474514893000, "val": 76 }, { "ts": 1474514903000, "val": 75 }, { "ts": 1474514913000, "val": 70 }, { "ts": 1474514923000, "val": 92 }, { "ts": 1474514933000, "val": 66 }]
        let data = {}
        abc.forEach(element => {
            let lsKey = new Date(element.ts).toISOString().slice(0, 10)
            console.log(lsKey)
            data[lsKey] = element.val
        });
        console.log(data)
        let title = "Type - " + this.props.type + " Chart " + "File - " + this.props.fileData.file_name
        return (
            <React.Fragment>
                <Title>{title}</Title>
                <Table size="small">
                    <TableBody>
                        {this.props.type == "Line" ? (
                            <LineChart data={this.props.fileData.data} />
                        ) : (
                                <AreaChart data={this.props.fileData.data} />
                            )}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default Graphs;