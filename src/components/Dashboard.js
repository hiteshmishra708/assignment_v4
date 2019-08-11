import Blob from 'blob'
import FormData from 'form-data'
import React from 'react'
import Dragfiles from './Dragfiles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Graphs from './Graphs'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Files from '../'
import Title from './Title';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Api from './callApi'

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}
  
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: [],
            resData: [],
            loading: false,
            saveFiles: []
        }
    }

    setStateData = (isloading= false, val, data) => {
        if(isloading) {
            this.setState({ loading: true })
        } else {
            this.setState({[val]: data, loading: false})            
        }
    }

    callApi(api, val, type='get', body=undefined, isBolb=false) {
        this.setStateData(true)
        Api(api, type, body, isBolb).then(response => {
            if(response.status) {
                this.setStateData(false, val, response.data)
                api == '/files' && this.callApi('/getfiles', 'saveFiles')
            }
        }).catch(err => {
            console.log("Server error API-> "+ err)
            this.setState({ loading: false })
            window.alert('Server error API-> ' + api)
        })
    }

    componentDidMount() {
        this.callApi('/getfiles', 'saveFiles')
    }

    onFilesChange = (files) => {
        this.setState({
            files
        }, () => {
            console.log(this.state.files)
        })
    }

    onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

    filesRemoveOne = (file) => {
        this.refs.files.removeFile(file)
    }

    filesRemoveAll = () => {
        this.setState({ resData: [] })
        this.refs.files.removeFiles()
    }

    filesUpload = () => {
        this.setStateData(true)
        const formData = new FormData()
        Object.keys(this.state.files).forEach((key) => {
            const file = this.state.files[key]
            var path = (window.URL || window.webkitURL).createObjectURL(file);
            formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
        })
        this.callApi('/files', 'resData', 'POST', formData, true)
    }

    getFileDetails(body) {
        this.callApi('/getfileinfo', 'resData', 'POST', body)
    }

    deleteFiles = () => {
        this.callApi('/deleteAll', 'saveFiles')
    }

    getFileSize(size) {
		if (size >= 1000000000) {
			return Math.ceil(size / 1000000000) + 'GB'
		} else if (size >= 1000000) {
			return Math.ceil(size / 1000000) + 'MB'
		} else if (size >= 1000) {
			return Math.ceil(size / 1000) + 'KB'
		} else {
			return Math.ceil(size) + 'B'
		}
	}

    render() {
        const classes = makeStyles(theme => ({
            progress: {
                margin: theme.spacing(2),
            },
        }));
        let hasFiles = this.state.files.length > 0
        let hasSavedFiles = this.state.saveFiles.length > 0
        let col = hasFiles ? 4 : (hasSavedFiles? 8: 12)
        return (
            <>
                {this.state.loading ? (
                    <CircularProgress className={classes.progress}
                        style={{ marginLeft: '50%', marginTop: '30%' }}
                    />
                ) : (
                        <>
                            <Grid item xs={12} md={col} lg={col}>
                                <Paper className={this.props.fixedHeightPaper} style={!(hasFiles && hasSavedFiles)? {height: "100%"}: null}>
                                    <Title>Drop Zone</Title>
                                    <Files
                                        ref='files'
                                        className='files-dropzone-list'
                                        onChange={this.onFilesChange}
                                        onError={this.onFilesError}
                                        multiple
                                        maxFiles={10}
                                        maxFileSize={500070808}
                                        minFileSize={0}
                                        clickable
                                    >
                                        <p className="drag-text">Drop files here or click to upload</p>
                                    </Files>
                                </Paper>
                            </Grid>
                            {hasFiles && (
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper className={this.props.fixedHeightPaper}>
                                        <Dragfiles
                                            files={this.state.files}
                                            filesUpload={this.filesUpload.bind(this)}
                                            filesRemoveAll={this.filesRemoveAll}
                                            filesRemoveOne={this.filesRemoveOne.bind(this)}
                                        />
                                    </Paper>
                                </Grid>
                            )}
                            {this.state.saveFiles.length > 0 && (
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper className={this.props.fixedHeightPaper}>
                                        <Title>Saved Files</Title>
                                        <Button variant="contained" color="primary" className={classes.button} onClick={this.deleteFiles}>
                                            Delete all saved files
                                        </Button>
                                            {this.state.saveFiles.map((value, idx) => {
                                                return (
                                                    <ListItemLink key={idx} onClick={() => this.getFileDetails(value)}>
                                                        <ListItemText primary={value.file_name + " Size - " + this.getFileSize(value.file_size)} />
                                                        <Link color="inherit" target="_blank" href={"/download/" + value.file_name}>
                                                            View File
                                                        </Link>
                                                    </ListItemLink>
                                                )
                                            })}
                                    </Paper>
                                </Grid>
                            )}
                            {this.state.resData.map((value, index) => {
                                return (
                                    <>
                                        <Grid item xs={12}>
                                            <Paper className={this.props.classes.paper}>
                                                <Graphs fileData={value} type="Line" size={this.getFileSize(value.file_size)} />
                                                <Graphs fileData={value} type="Area" />
                                            </Paper>
                                        </Grid>
                                    </>
                                )
                            })}
                        </>
                    )}
            </>
        );
    }
}

export default Dashboard;
