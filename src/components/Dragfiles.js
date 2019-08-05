import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';

class Dragzone extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const classes = makeStyles(theme => ({
			button: {
				margin: theme.spacing(1),
			},
			input: {
				display: 'none',
			},
		}));
		return (<React.Fragment>
			<Title>Drag Files</Title>
			{this.props.files.length > 0
				? (<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>
								<Button variant="contained" color="primary" className={classes.button} onClick={this.props.filesUpload.bind(this)}>
									Upload
                </Button>
								<Button variant="contained" color="primary" className={classes.button} onClick={this.props.filesRemoveAll.bind(this)} ref='files'>
									Remove All Files
                </Button>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<div className='files-list'>
							<ul>{this.props.files.map((file) =>
								<li className='files-list-item' key={file.id}>
									<div className='files-list-item-preview'>
										{file.preview.type === 'image'
											? <img className='files-list-item-preview-image' src={file.preview.url} />
											: <div className='files-list-item-preview-extension'>{file.extension}</div>}
									</div>
									<div className='files-list-item-content'>
										<div className='files-list-item-content-item files-list-item-content-item-1'>{file.name}</div>
										<div className='files-list-item-content-item files-list-item-content-item-2'>{file.sizeReadable}</div>
									</div>
									<div
										id={file.id}
										className='files-list-item-remove'
										onClick={this.props.filesRemoveOne.bind(this, file)}
									/>
								</li>
							)}</ul>
						</div>

					</TableBody>
				</Table>
				) : null}
		</React.Fragment>
		);
	}
}

export default Dragzone;