import { withStyles } from "@material-ui/core/styles";
//import { TableCell } from "material-ui";
import TableCell from "@material-ui/core/TableCell";

export const CustomTableCell = withStyles(theme => {return {
    head: {
        backgroundColor: "#253241",
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
};})(TableCell);

const styles = theme => {return {
    root: {
        width: "100%",
        overflowX: "auto"
    },
    table: {
        minWidth: 700
    },
    tableCell:{
        fontSize:12.5,
    },
    button: {
        float: "right",
        margin: theme.spacing.unit,
        background: "#00aa9f", // #F06E49
        "&:hover": {
            background: "#00C1B3", // #FE7A53
        }
    },

    row: {
        "&:nth-of-type(odd)": {
            backgroundColor: "#EAEFF2",
        }
    },
    
    techColumn:{
        width:350,
        fontSize:12.5,
    },

    actionColumn:{
        width:150,
        fontSize:12.5
    },

    actionButton: {
        color: "#34485d",
        minWidth: "0px",
        paddingLeft: "0.5rem",
        paddingRight: "0.5rem",
    },
    
    createIcon: {
        marginRight: "0.25rem",
        textTransform: "capitalize",
        height: "2.5rem", 
    },

    title: {
        display: "inline-block",
        padding: "1rem 0rem 0rem 1rem",
    },

    typography: {
        color: "#34485D",
    },
    locationColumn: {
        textTransform: "capitalize"
    },
        
    nameColumn: {
        fontSize:12.5,
        width: 200
    },
};};

export default withStyles(styles);
