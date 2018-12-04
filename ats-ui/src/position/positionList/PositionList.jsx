import React, { Component, Fragment } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TablePagination
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Description";
import CopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import styles, { CustomTableCell } from "../../components/tableCell/TableCell";
import TablePaginationActions from "../../components/tablePaginationActions/TablePaginationAction";
import Typography from "@material-ui/core/Typography";
import Navigation from "../../components/menu/Navigation";
import Logout from "../../components/logout/logout";
import Loader from "../../components/loader/loader";
import mapping from "../../RoleMapping.js";
// TODO : GET RESOURCE URL FROM EXTERNAL MODULE
// LOAD THIS CONSTANT FROM EXTERNAL MODULE
const HOST = "http://localhost:4000";
const POSITION_API = "/position";
const defaultPage = 0;
const PAGE_SIZE = 10;
const Details = props => {
    return (
        <Link to={`/positions/${props.id}/details`} {...props} />
    );
};

const Update = props => {
    return (
        <Link to={`/positions/${props.id}/edit`} {...props} />
    );
};

const CopyPosition = props => {
    return (
        <Link to={"/copyPosition/"} {...props} />
    );
};

function isAllowed(component,keycloak) {
    var isAllowedAccess = false;
    keycloak.tokenParsed.resource_access.ATS.roles.forEach(function (roles, index) {
        if (mapping[component] && mapping[component].indexOf(roles) !== -1) {
            isAllowedAccess = true;
        }
    });
    return isAllowedAccess;
}

class PositionList extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            count: 0,
            offset: 0,
            page: 0,
            totalPage: 0,
            rowsPerPage: PAGE_SIZE,
            keycloak: null,
            authenticated: false,
            showLoader: true
        };
    }

    componentDidMount() {
        axios.defaults.headers.common["Authorization"] = "Bearer " + this.props.keycloak.token;
        this.fetchData();
    }

	handleChangePage = async (event, page) => {
	    this.fetchAndSetStateData(page, this.state.rowsPerPage);
	};

	handleChangeRowsPerPage = async event => {
	    this.fetchAndSetStateData(this.state.page, event.target.value);
	};

	fetchData = () => {
	    return this.fetchAndSetStateData(this.state.page, this.state.rowsPerPage);
	}

	fetchAndSetStateData = async (page=defaultPage, rowsPerPage=PAGE_SIZE) => {
	    try {
	        let result = await axios.get(`${HOST}${POSITION_API}`, {
	            params: {
	                pageSize: rowsPerPage,
	                offset: Math.max(page, 0) * rowsPerPage
	            }
	        }).then((r) => {
	            return r.data;
	        });

	        let { body } = result;
	        let { totalCount, data } = body;
	        this.setState({
	            list: data,
	            count: totalCount,
	            page: page,
	            rowsPerPage: rowsPerPage,
	            showLoader: false
	        });
	        return result;
	    } catch (error) {
	        console.log(error);
	    }
	}

	render() {
	    const { classes } = this.props;
	    const CreatePosition = props => { return <Link to="/positions/add" {...props} />; };
	    if(this.props.keycloak) {
	        if(this.props.keycloak.authenticated) return (
	            <div>
	                <Logout keycloak={this.props.keycloak} />
	                <Navigation value={1} keycloak={this.props.keycloak}/>
	                {this.state.showLoader ? <Loader /> :
               
	                <Fragment>
	                    <div className={classes.title}>
	                        <Typography variant="title" className={classes.typography}>
                            Positions
	                        </Typography>
	                    </div>
	                        {isAllowed("CreatePosition",this.props.keycloak) ?
	                            <Tooltip id="tooltip-fab" title="Create Position ">
	                                <Button
	                                    variant="extendedFab"
	                                    color="primary"
	                                    aria-label="add"
	                                    className={`${classes.button} ${classes.createIcon}`}
	                                    component={CreatePosition}
	                                >
	                                    <AddIcon className={classes.createIcon}/>
								Create
	                                </Button>
	                            </Tooltip>
	                            : null}
	                    <Paper className={classes.root}>
	                        <Table className={classes.table}>
	                            <TableHead>
	                                <TableRow>
	                                    <CustomTableCell className={classes.tableCell}>Account Name</CustomTableCell>
	                                    <CustomTableCell className={classes.nameColumn}>
                                        Owner Name
	                                    </CustomTableCell>
	                                    <CustomTableCell className={classes.tableCell}>
                                        Positions
	                                    </CustomTableCell>
	                                    <CustomTableCell className={classes.techColumn}>
                                        Technologies
	                                    </CustomTableCell>
	                                    <CustomTableCell className={classes.tableCell}>
                                        Level{" "}
	                                    </CustomTableCell>
	                                    <CustomTableCell className={classes.tableCell}>
                                        Location{" "}
	                                    </CustomTableCell>
	                                    <CustomTableCell className={classes.actionColumn}>Actions </CustomTableCell>
	                                </TableRow>
	                            </TableHead>
	                            <TableBody>
	                                {this.state.list.map(item => {
	                                    return (
	                                        <TableRow
	                                            key={item._id}
	                                            className={classes.row}
	                                        >
	                                            <CustomTableCell>
	                                                {item.account_name}
	                                            </CustomTableCell>
	                                            <CustomTableCell>
	                                                {item.owner_name}
	                                            </CustomTableCell>
	                                            <CustomTableCell>
	                                                {item.total_position}
	                                            </CustomTableCell>
	                                            <CustomTableCell>
	                                                {item.technology.map(tech => { return (tech.technology);}).join(",")}
	                                            </CustomTableCell>
	                                            <CustomTableCell>
	                                                {item.candidate_level}
	                                            </CustomTableCell>
	                                            <CustomTableCell className={classes.locationColumn}>
	                                                {item.location}
	                                            </CustomTableCell>
	                                            <CustomTableCell>
	                                                    <Tooltip title="Copy Position Details">
	                                                    <IconButton
	                                                        aria-label="Copy"
	                                                        id={item._id}
	                                                        component={CopyPosition}
	                                                        className={classes.actionButton}
	                                                        size="small"
	                                                    >
	                                                        <CopyIcon />
	                                                    </IconButton>
	                                                </Tooltip>
	                                                    {isAllowed("ViewPosition",this.props.keycloak) ?
	                                                <Tooltip title="Details">
	                                                    <IconButton
	                                                        aria-label="Details"
	                                                        id={item._id}
	                                                        component={Details}
	                                                        className={classes.actionButton}
	                                                        size="small"
	                                                    >
	                                                        <InfoIcon />
	                                                    </IconButton>
	                                                </Tooltip>
	                                                        : null}
	                                                    {isAllowed("EditPosition",this.props.keycloak) ?
	                                                <Tooltip title="Edit Position">
	                                                    <IconButton
	                                                        aria-label="Details"
	                                                        id={item._id}
	                                                        component={Update}
	                                                        className={classes.actionButton}
	                                                    >
	                                                        <EditIcon />
	                                                    </IconButton>
	                                                </Tooltip>
	                                                        : null}
	                                            </CustomTableCell>
	                                        </TableRow>
	                                    );
	                                })}
	                            </TableBody>
	                        </Table>
	                        <TablePagination
	                            component="div"
	                            count={this.state.count}
	                            page={this.state.page}
	                            rowsPerPage={this.state.rowsPerPage}
	                            onChangePage={this.handleChangePage}
	                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
	                            ActionsComponent={TablePaginationActions}
	                        />
	                    </Paper>
	                </Fragment>
	                }
	            </div>
	        );else return (<div>Unable to authenticate!</div>);
	    } else return (<Loader />);
	    
	}
}

export default styles(PositionList);
