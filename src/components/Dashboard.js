import axios from 'axios'
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

    setLoadingMode() {
        this.setState({ loading: true })
    }

    componentDidMount() {
        this.setLoadingMode()
        axios.get(`/getfiles`)
            .then(response => {
                return JSON.stringify(response.data)
                // window.alert(`${this.state.files.length} files uploaded succesfully!`)
            })
            .then(data => {
                console.log("response==>", data)
                let resData = JSON.parse(data)
                if (resData.status) {
                    this.setState({ saveFiles: resData.data, loading: false })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                window.alert('Error uploading files')
            })
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
        this.setLoadingMode()
        const formData = new FormData()
        Object.keys(this.state.files).forEach((key) => {
            const file = this.state.files[key]
            formData.append(key, new Blob([file], { type: file.type }), file.name || 'file')
        })

        axios.post(`/files`, formData)
            .then(response => {
                return JSON.stringify(response.data)
                // window.alert(`${this.state.files.length} files uploaded succesfully!`)
            })
            .then(data => {
                console.log("response", data)
                let resData = JSON.parse(data)
                if (resData.status) {
                    this.setState({ resData: resData.data, loading: false })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                window.alert('Error uploading files')
            })
    }

    getFileDetails(body) {
        this.setLoadingMode()
        axios.post(`/getfileinfo`, body)
            .then(response => {
                return JSON.stringify(response.data)
                // window.alert(`${this.state.files.length} files uploaded succesfully!`)
            })
            .then(data => {
                console.log("response", data)
                let resData = JSON.parse(data)
                if (resData.status) {
                    this.setState({ resData: resData.data, loading: false })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                window.alert('Error uploading files')
            })
    }

    deleteFiles = () => {
        this.setState({loading: true})
        axios.get(`/deleteAll`)
            .then(response => {
                return JSON.stringify(response.data)
                // window.alert(`${this.state.files.length} files uploaded succesfully!`)
            })
            .then(data => {
                console.log("response", data)
                let resData = JSON.parse(data)
                if (resData.status) {
                    this.setState({ saveFiles: [], loading: false })
                }
            })
            .catch(err => {
                this.setState({ loading: false })
                window.alert('Error uploading files')
            })
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
                                <Paper className={this.props.fixedHeightPaper}>
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
                                                        <ListItemText primary={value.file_name} />
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
                                                <Graphs fileData={value} type="Line" />
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
