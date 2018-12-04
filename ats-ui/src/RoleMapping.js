var roleMappingMeaning={
    "00":"all access on UIs",
    "01":"all view access on UIs",
    "02":"all create access on UIs",
    "03":"all edit access on UIs",
    "100":"all",
    "101":"view",
    "102":"create",
    "103":"edit"
};

var mapping = {
    "Position":["Positions-100","Positions-101","Positions-102","Positions-103","00","01","02","03"],
    "Home":["Home-100","Home-101","Home-102","Home-103","ALL-00","00","01","02","03"],
    "Candidate":["Candidate-100","Candidate-101","Candidate-102","Candidate-103","ALL-00","00","01","02","03"],
    "ViewPosition":["Positions-101","00","01"],
    "CreatePosition":["Positions-102","00","02"],
    "EditPosition":["Positions-103","00","03"]
};

export default mapping;