import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";
import axios from "axios";

// TODO : GET RESOURCE URL FROM EXTERNAL MODULE

// LOAD THIS CONSTANT FROM EXTERNAL MODULE
const HOST = "http://localhost:4000";
const POSITION_API = "/position";

const List = props => { return <Link to="/positions" {...props} />; };
const styles = theme => {
    return {
        root: {
            flexGrow: 1,
        },
        paper: {
            margin: "auto",
            marginTop: theme.spacing.unit * 2,
            width: "75%",
            minHeight: 460,
            height: "auto",
            display: "flex",
            flexDirection: "column",
        },
        expantionPanel: {
            marginTop: theme.spacing.unit * 0,
            minHeight: 50,
        },
        expantionPanelDetails: {
            padding: theme.spacing.unit * 1,
            paddingLeft: theme.spacing.unit * 3,
        },
        details: {
            display: "flex",
            flexDirection: "column",
        },
        positionTitle: {
            display: "flex"
        },

        cardTitle: {
            backgroundColor: "#eaeff2"
        },

        technologyList: {
            display: "flex",
            maxHeight: 60,
        },
        content: {
            flex: "1 0 auto",
        },
        cardTitleColor: {
            color: "#34485d",
        },
        chip: {
            margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
        },
        button: {
            alignSelf: "flex-end",
            width: 100,
            marginTop: theme.spacing.unit * 2,
            margin: theme.spacing.unit,
            textTransform:"none",
        },
        title: {
            display: "inline-block",
            padding: "1rem 0rem 0rem 1rem",
        },
        typography: {
            color: "#34485D",
        }
    };
};

class PositionDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {},
            fetched: false,
            technologyList: [],
        };
    }

    componentDidMount() {
        this.fetchAndSetStateData();
    }

    shouldComponentUpdate() {
        if (this.state.hasFetched) {
            return false;
        }
        return true;
    }

	fetchAndSetStateData = async () => {
	    try {
	        let result = await axios.get(`${HOST}${POSITION_API}/${this.props.match.params.id}`).then((r) => {
	            return r.data;
	        });
	        let { body } = result;
	        if (body) {
	            this.state.technologyList = result.body.technology;

	            this.setState({
	                data: body,
	                fetched: true
	            });
	        }
	    } catch (error) {
	        console.log(error);
	    }
	}
	render() {
	    const { classes } = this.props;
	    return (
	        <div>
	            <div className={classes.title}>
	                <Typography variant="title" className={classes.typography}>
						Open Position
	                </Typography>
	            </div>
	            <Paper className={classes.paper}>
	                <Card className={`${classes.positionTitle} ${classes.cardTitle}`}>
	                    <div className={classes.details}>
	                        <CardContent className={classes.content}>
	                            <Typography variant="title" gutterBottom className={classes.cardTitleColor}>
	                                <span>Position available for {this.state.data.title}</span>
	                                <span> in {this.state.data.location} </span>
	                                <span>{this.state.data.project_name} project</span>
	                            </Typography>
	                        </CardContent>
	                    </div>
	                    <CardContent className={classes.content}>
	                        <Typography variant="title" gutterBottom className={classes.cardTitleColor}>
	                            <span>{this.state.data.required_min_exp} Years</span>
	                        </Typography>
	                        <Typography variant="subheading" gutterBottom className={classes.cardTitleColor}>
	                            <span>Min Experience</span>
	                        </Typography>
	                    </CardContent>
	                </Card>
	                <Card>
	                    <div className={classes.details}>
	                        <CardContent className={classes.content}>
	                            <Typography variant="body2">
	                                {this.state.technologyList.map(data => {
	                                    let avatar = null;
	                                    return (
	                                        <Chip
	                                            key={data.key}
	                                            avatar={avatar}
	                                            label={data.technology}
	                                            className={classes.chip}
	                                        />
	                                    );
	                                })}
	                            </Typography>
	                        </CardContent>
	                    </div>
	                </Card>
	                <Card className={classes.card}>
	                    <div className={classes.details}>
	                        <CardContent className={classes.content}>
	                            <Typography variant="caption" gutterBottom>Job Description</Typography>
	                            <Typography variant="subheading" gutterBottom>
	                                <span>{this.state.data.description}</span>
	                            </Typography>
	                        </CardContent>
	                    </div>
	                </Card>
	                <Card className={classes.positionTitle}>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Owner Name</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.owner_name}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Client</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.client}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Employment Type</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.employment_type}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Shift Timing</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.shift_timing}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.cover}>
	                        <Typography variant="caption" gutterBottom>Level of Candidate</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.candidate_level}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.cover}>
	                        <Typography variant="caption" gutterBottom>Number of Position</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.total_position}</span>
	                        </Typography>
	                    </CardContent>
	                </Card>
	                <Card className={classes.positionTitle}>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Billing Status</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.billing_status}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Notice Period</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.notice_period}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Level 1 tech panel</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.level_1_tech_panel}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.content}>
	                        <Typography variant="caption" gutterBottom>Level 2 tech panel</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.level_2_tech_panel}</span>
	                        </Typography>
	                    </CardContent>
	                    <CardContent className={classes.cover}>
	                        <Typography variant="caption" gutterBottom>Practice Name</Typography>
	                        <Typography variant="subheading" gutterBottom>
	                            <span>{this.state.data.practice_name}</span>
	                        </Typography>
	                    </CardContent>
	                </Card>
	                <ExpansionPanel className={classes.expantionPanel}>
	                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
	                        <Typography variant="caption" gutterBottom>Remarks</Typography>
	                    </ExpansionPanelSummary>
	                    <ExpansionPanelDetails className={classes.expantionPanelDetails}>
	                        <Typography variant="body2" gutterBottom>
	                            <span>{this.state.data.comments}</span>
	                        </Typography>
	                    </ExpansionPanelDetails>
	                </ExpansionPanel>
	                <Button
	                    variant="raised"
	                    className={`${classes.buttonBlueBg}  ${classes.button}`}
	                    component={List}
	                > Close
	                </Button>
	            </Paper>
	        </div>
	    );
	}
}
export default withStyles(styles)(PositionDetails);