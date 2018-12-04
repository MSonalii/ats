import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import deburr from "lodash/deburr";
import keycode from "keycode";
import Downshift from "downshift";
import { Link } from "react-router-dom";
import dateformat from "dateformat";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import AppTitle from "../../components/title/AppTitle";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

// TODO : GET RESOURCE URL FROM EXTERNAL MODULE
// LOAD THIS CONSTANT FROM EXTERNAL MODULE
const HOST = "http://localhost:4000";
const POSITION_API = "/position";
const TECHNOLOGY_API = "/technology";
const PRACTICE_API = "/practice";
const List = props => { return <Link to="/positions" {...props} />; };

const theme = createMuiTheme({
    palette: {
        primary: { main: "#02ffec" }, //#00C1B3 #02ffec
        secondary: { main: "#00aa9f" }, // #F06E49
    }
});

const styles = theme => {
    return {
        Downshift: {
            position: "relative",
            width: 500,
            display: "inline-block",
            marginRight: theme.spacing.unit * 4,
        },
        chip: {
            margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
        },
        deleteBtn: {
            color: "yellow",
        }, 
        paper: {
            position: "absolute",
            width: 500,
            zIndex: 2,
        },
        inputRoot: {
            width: 500,
            flexWrap:"wrap",
            display:"block",
        },
        textField: {
            marginLeft: theme.spacing.unit * 2,
            marginRight: theme.spacing.unit * 2,
            width: 500
        },
        selectField: {
            width: 500,
            "&:hover": {
                borderBottomColor: "#FFFF00",
            }
        },
        margin: {
            //margin: theme.spacing.unit * 2,
            textAlign: "center",
            width: "80%",
    		margin: "auto",
        },
        button: {
            //float: "right",
            margin: theme.spacing.unit,
            textTransform:"none",
        },
		
        buttonBlueBg: {
            color: theme.palette.common.white,
            "&:hover": {
                backgroundColor: "#00C1B3", //  #fe7a53
            }
        },
        errorText: {
            color: "red",
        },
        location: {
            marginLeft: "0px",
        }
    };
};

const location = [
    {
        value: "pune",
        label: "Pune"
    },
    {
        value: "delhi",
        label: "Delhi"
    },
    {
        value: "hyderabad",
        label: "Hyderabad"
    }
];
const employmentType = [
    {
        value: "full time",
        label: "Full Time"
    },
    {
        value: "part time",
        label: "Part Time"
    },
    {
        value: "remote",
        label: "Remote"
    },
    {
        value: "internship",
        label: "Internship"
    },
    {
        value: "project",
        label: "Project"
    },
    {
        value: "temporary",
        label: "Temporary"
    },
    {
        value: "relocate",
        label: "Relocate"
    }
];

const shiftTiming = [
    {
        value: "day",
        label: "Day"
    },
    {
        value: "second",
        label: "Second"
    },
    {
        value: "night",
        label: "Night"
    }
];
let tech = "";
function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;
    return (
        <TextField
            required
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem.technology || "").indexOf(suggestion.technology) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.technology}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.technology}
        </MenuItem>
    );
}

class UpdatePosition extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                title: "",
                client:"",
                employment_type:"",
                shift_timing:"",
                billing_status:"",
                notice_period:"",
                level_1_tech_panel:"",
                level_2_tech_panel:"",
                practice_name:"",
                account_name: "",
                owner_name: "",
                total_position: "",
                technology: "",
                candidate_level: "",
                start_date: "",
                project_name: "",
                location: [],
                description: "",
                comments: "",
                required_min_exp: ""
            },
            fetch: false,
            inputValue: "",
            techSelectedItem: [],
            practiceNames: [],
            suggestions: [],
            errorClass: "hiddenDownshiftError",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
		
    }

	handleChange = name => {
	    // const dateString = new Date().toDateString();
	    // const todayDate = new Date(dateString).getTime();
        
	    // ValidatorForm.addValidationRule("minDate", (value) => {
	    //     if (todayDate >  new Date(value).getTime()) {
	    //         return false;
	    //     }
	    //     return true;
	    // });
        
	    return event => {
	        const data = this.state.data;
	        data[name] = event.target.value;
	        this.setState({ data: data });
	    };
	};

	handleKeyDown = event => {
	    const { inputValue, techSelectedItem } = this.state;
	    if (techSelectedItem.length && !inputValue.length && keycode(event) === "backspace") {
	        this.setState({
	            techSelectedItem: techSelectedItem.slice(0, techSelectedItem.length - 1),
	        });
	    }
	};

	handleInputChange = event => {
	    this.setState({ inputValue: event.target.value });
	};

	handleChangeNew = item => {
	    this.setState({errorClass: "hiddenDownshiftError"});
	    let { techSelectedItem } = this.state;

	    this.state.suggestions.forEach(function (suggestion, index) {
	        if (suggestion.technology == item && techSelectedItem.indexOf(item) === -1) {
	            techSelectedItem.push(suggestion);
	        }
	    });

	    this.setState({
	        inputValue: "",
	        techSelectedItem: techSelectedItem,
	    });

	};

	handleDelete = item => () => {
	    let techData = this.state.techSelectedItem;
        
	    if(techData.length == 1) {
	        this.setState({errorClass: "DownshiftError"});
	        return;
	    }
	    techData = techData.filter(function(techObj) { return techObj.technology != item.technology; }); 
	    this.setState({
	        techSelectedItem: techData,
	    });
	};

	getTechnologyList = async () => {
	    try {
	        let result = await axios.get(`${HOST}${TECHNOLOGY_API}`).then((r) => {
	            return r.data;
	        });
	        let { body } = result;
         
	        if (body) {
	            const suggestions = body.data; 
                
	            this.setState({
	                suggestions: body.data,
	                fetch: true
	            });
	        }
	    } catch (error) {
	        //console.log(error);
	    }
	}

	getPracticeName = async () => {
	    try {
	        let result = await axios.get(`${HOST}${PRACTICE_API}`).then((r) => {
	            return r.data;
	        });
	        let { body } = result;
            
	        if (body) {
	            const practiceNames = body.data;
	            this.setState({
	                practiceNames: body.data,
	                fetched: true
	            });
	        }
	    } catch (error) {
	        //console.log(error);
	    }
	}

	getSuggestions(value) {
	    const inputValue = deburr(value.trim()).toLowerCase();
	    const inputLength = inputValue.length;
	    let count = 0;
	    let suggestionList = [];
        
	    suggestionList = inputLength === 0
	        ? []
	        : this.state.suggestions.filter(suggestion => {
	            const keep =
					count < 5 && suggestion.technology.slice(0, inputLength).toLowerCase() === inputValue;

	            if (keep) {
	                count += 1;
	            }

	            return keep;
	        });
        
	    return suggestionList;
	}

	handleSubmit = name => {
	    return async event => {
	        tech = "";
	        event.preventDefault();
	        tech = this.state.techSelectedItem.map(function (k) {
	            return k._id;
	        }).join(",");
	        var data = this.state.data;
	        data.technology = tech;
	        this.setState({
	            data: data
	        });
	        try {
	            let result = await axios.put(`${HOST}${POSITION_API}/${this.props.match.params.id}`, this.state.data).then((r) => {
	                this.props.history.push("/positions");
	            });
	        } catch (error) {
	            console.log(error);
	        }
	    };
	};

	componentDidMount() {
	    this.fetchAndSetStateData();
	    this.getTechnologyList();
	    this.getPracticeName();
        
	    ValidatorForm.addValidationRule("isRequired", (value) => {
	        if (value === "") {
	            return false;
	        }
	        return true;
	    });
	}

	shouldComponentUpdate() {
	    console.log("in shouldcomponentupdate");
	    if (this.state.fetch) {
	        return true;
	    }
	    return false;
	}

	fetchAndSetStateData = async () => {
	    try {
	        let result = await axios.get(`${HOST}${POSITION_API}/${this.props.match.params.id}`).then((r) => {
	            return r.data;
	        });
	        let { body } = result;          
	        if (body) {
	            body.location = body.location.split(",");
	            body.start_date = dateformat(body.start_date, "yyyy-mm-dd");
                
	            this.setState({
	                data: body,
	                fetch: true,
	                techSelectedItem: body.technology
	            });
	        }
	    } catch (error) {
	        //console.log(error);
	    }
	}
	render() {
	    const { classes } = this.props;
	    const { inputValue, techSelectedItem } = this.state;
        
	    return (
	        <MuiThemeProvider theme={theme}>
	            <AppTitle name="Update" />
	            <ValidatorForm noValidate autoComplete="off" className={classes.margin} onSubmit={this.handleSubmit("name")}>
	                <TextValidator
	                    required
	                    id="title"
	                    label="Role/Title"
	                    name="title"
	                    value={this.state.data.title}
	                    className={classes.textField}
	                    onChange={this.handleChange("title")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Title"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    id="client"
	                    label="Client"
	                    name="client"
	                    value={this.state.data.client}
	                    placeholder="Enter the Client Name"
	                    className={classes.textField}
	                    onChange={this.handleChange("client")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Client Name"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    select
	                    id="employment_type"
	                    label="Employment Type"
	                    name="employment_type"
	                    value={this.state.data.employment_type}
	                    className={classes.textField}
	                    onChange={this.handleChange("employment_type")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Employment Type"]}
	                    margin="normal">
	                    {employmentType.map(option => (
	                        <MenuItem key={option.value} value={option.value}>
	                            {option.label}
	                        </MenuItem>
	                    ))}
	                </TextValidator>
	                <TextValidator
	                    required
	                    select
	                    id="shift_timing"
	                    label="Shift Timing"
	                    name="shift_timing"
	                    value={this.state.data.shift_timing}
	                    className={classes.textField}
	                    onChange={this.handleChange("shift_timing")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Shift Timing"]}
	                    margin="normal">
	                    {shiftTiming.map(option => (
	                        <MenuItem key={option.value} value={option.value}>
	                            {option.label}
	                        </MenuItem>
	                    ))}
	                </TextValidator>
	                <TextValidator
	                    required
	                    id="billing_status"
	                    label="Billing Status"
	                    name="billing_status"
	                    value={this.state.data.billing_status}
	                    className={classes.textField}
	                    onChange={this.handleChange("billing_status")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Billing Status"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    id="notice_period"
	                    label="Notice Period"
	                    name="notice_period"
	                    value={this.state.data.notice_period}
	                    className={classes.textField}
	                    onChange={this.handleChange("notice_period")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Notice Period"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    id="level_1_tech_panel"
	                    label="Level 1 tech panel"
	                    name="level_1_tech_panel"
	                    value={this.state.data.level_1_tech_panel}
	                    className={classes.textField}
	                    onChange={this.handleChange("level_1_tech_panel")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Level 1 tech panel"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    id="level_2_tech_panel"
	                    label="Level 2 tech panel"
	                    name="level_2_tech_panel"
	                    value={this.state.data.level_2_tech_panel}
	                    className={classes.textField}
	                    onChange={this.handleChange("level_2_tech_panel")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Level 2 tech panel"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    select
	                    id="practice_name"
	                    label="Practice Name"
	                    name="practice_name"
	                    value={this.state.data.practice_name}
	                    className={classes.textField}
	                    onChange={this.handleChange("practice_name")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Practice Name"]}
	                    margin="normal"
	                >
	                    {this.state.practiceNames.map(option => (
	                        <MenuItem key={option.Name} value={option.Name}>
	                            {option.Name}
	                        </MenuItem>
	                    ))}
	                </TextValidator>

	                <TextValidator
	                    required
	                    id="account_name"
	                    label="Account Name"
	                    name="account_name"
	                    value={this.state.data.account_name}
	                    onChange={this.handleChange("account_name")}
	                    className={classes.textField}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Account Name"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    name="owner-name"
	                    label="Owner Name"
	                    value={this.state.data.owner_name}
	                    placeholder="Enter the name"
	                    className={classes.textField}
	                    onChange={this.handleChange("owner_name")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Owner Name"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    name="total_position"
	                    label="Number of Positions"
	                    value={this.state.data.total_position}
	                    className={classes.textField}
	                    onChange={this.handleChange("total_position")}
	                    validators={["matchRegexp:^[0-9]+$", "isRequired"]}
	                    errorMessages={["Number of Position should be integer", "Please enter Number of Position"]}
	                    margin="normal"
	                />

	                <TextValidator
	                    required
	                    name="required_min_exp"
	                    label="Min Experience"
	                    value={this.state.data.required_min_exp}
	                    className={classes.textField}
	                    onChange={this.handleChange("required_min_exp")}
	                    validators={["matchRegexp:^[0-9]+$", "isRequired"]}
	                    errorMessages={["Min Experience should be integer", "Please enter Min Experience"]}
	                    margin="normal"
	            	/>
	                <TextValidator
	                    required
	                    name="candidate_level"
	                    label="Level of Candidate"
	                    value={this.state.data.candidate_level}
	                    placeholder="Enter the name"
	                    className={classes.textField}
	                    onChange={this.handleChange("candidate_level")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Level of Candidate"]}
	                    margin="normal"
	                />
	                <TextValidator
	                    required
	                    name="start-date"
	                    label="Start Date"
	                    value={this.state.data.start_date}
	                    type="date"
	                    disabled
	                    onChange={this.handleChange("start_date")}
	                    // validators={["minDate"]}
	                    // errorMessages={["Selected date should be greater than todays date"]}
	                    className={classes.textField}
	                    InputLabelProps={{
	                        shrink: true
	                    }}
	                />
	                <TextValidator
	                    name="project_name"
	                    label="Project Name"
	                    value={this.state.data.project_name}
	                    placeholder="Enter the Project Name"
	                    className={classes.textField}
	                    onChange={this.handleChange("project_name")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Project Name"]}
	                    margin="normal"
	                />
	                <Downshift
	                    required
	                    id="downshift-multiple"
	                    inputValue={inputValue}
	                    className={classes.Downshift}
	                    onChange={this.handleChangeNew}
	                    selectedItem={techSelectedItem}
	                >
	                    {
	                        ({
	                        getInputProps,
	                        getItemProps,
	                        isOpen,
	                        inputValue: inputValue2,
	                        selectedItem: selectedItem2,
	                        highlightedIndex,
	                        techSelectedItem: techSelectedItem2,
	                    }) => (
	                            <div className={classes.Downshift}>
	                            {renderInput({
	                                classes,
	                                InputProps: getInputProps({
	                                    startAdornment: techSelectedItem.map(item => (
	                                            <Chip
	                                                key={item._id}
	                                                tabIndex={-1}
	                                                label={item.technology}
	                                                className={classes.chip}
	                                                onDelete={this.handleDelete(item)}                               
	                                            />
	                                    )),
	                                    onChange: this.handleInputChange,
	                                    onKeyDown: this.handleKeyDown,
	                                    placeholder: "Select Technology",
	                                }),
	                                label: "Technology",
	                            })}
	                            {isOpen ? (
	                                <Paper className={classes.paper} square>
	                                    {this.getSuggestions(inputValue2).map((suggestion, index) =>
	                                        renderSuggestion({
	                                            suggestion,
	                                            index,
	                                            itemProps: getItemProps({ item: suggestion.technology }),
	                                            highlightedIndex,
	                                            selectedItem: selectedItem2,
	                                        }),
	                                    )}
	                                </Paper>
	                            ) : null}
	                            <div className={this.state.errorClass}>
	                                <Typography variant="caption" align="left" className={classes.errorText}>
										Should contain atleast one technology
	                                </Typography>
	                            </div>
	                            </div>
	                        )}
	                </Downshift>
	                <FormControl className={classes.selectField}>
	                <InputLabel htmlFor="select-multiple-checkbox">Location</InputLabel>
	                <Select
	                    required
	                    name="location"
	                    label="Location"
	                    placeholder="location"
	                    multiple
	                    value={this.state.data.location}
	                    onChange={this.handleChange("location")}
	                    className={`${classes.textField}  ${classes.location}`}
	                    input={<Input id="select-multiple" />}
	            	>
	                {location.map(option => (
	                    <MenuItem
	                        key={option.value}
	                        value={option.value}
	                    >
	                        {option.label}
	                    </MenuItem>
	                ))}
	            	</Select>
	                </FormControl>
	                <TextValidator
	                    required
	                    name="description"
	                    label="Job Description"
	                    value={this.state.data.description}
	                    className={classes.textField}
	                    onChange={this.handleChange("description")}
	                    margin="normal"
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Job Description"]}
	                    multiline
	                    rows="4"
	                />
	                <TextValidator
	                    name="comments"
	                    label="Remarks"
	                    value={this.state.data.comments}
	                    placeholder="Enter the comment"
	                    className={classes.textField}
	                    onChange={this.handleChange("comments")}
	                    validators={["minStringLength:1"]}
	                    errorMessages={["Please enter Comments"]}
	                    margin="normal"
	                    multiline
	                    rows="4"
	                />
	                <br />
	                <Button
	                    variant="raised"
	                    className={classes.button}
	                    component={List}
	                >
						Cancel
	                </Button>
	                <Button
	                    variant="raised"
	                    color="secondary"
	                    type="submit"
	                    className={`${classes.buttonBlueBg}  ${classes.button}`}
	                >
						Submit
	                </Button>
	            </ValidatorForm>
	        </MuiThemeProvider>
	    );
	}
}

export default withStyles(styles)(UpdatePosition);