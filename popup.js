var tab_title = '';

var netrinUrl = "https://ecare.netrinhealth.com/";
//var netrinUrl = "http://10.200.0.68/";
//var netrinUrl = "http://localhost:5000/";

var currentsiteUrl = '';
var dob = '';
var mobilephone = '';
var homephone = '';
var email = '';
var firstname = '';
var lastname = '';
var _patientID = 0;
var _isEnableRPM = false;
var _providerId = 0;
var app_login_userid = 0;
var abc = true;
var ddl_patient = 0;
var BPBarChartData = [];
var GlucoseBarChartData = [];
var WeightBarChartData = [];
var BorderColors = ["rgb(236,92,12)", "rgb(20,36,91)", "rgb(4,156,227)", "rgb(148,188,12)"];
var BarChartGradientColors = [];
var BPXLabels = [];
var BPSystolicObj = [];
var BPDiastolicObj = [];
var GlucoseXLabels = [];
var WeightXLabels = [];
var GlucosObj = [];
var PulseObj = [];
var WeightObj = [];

$(document).ready(() => {

  document.getElementById("testBtnClick").addEventListener('click', InsertData);
  var ctx = document.getElementById("TestChart").getContext("2d");
  /*** Gradient ***/
  var gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, 'rgba(236,92,12,0.7)');
  gradient1.addColorStop(1, 'rgba(236,92,12,0)');
  var gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, 'rgba(20,36,91,0.7)');
  gradient2.addColorStop(1, 'rgba(20,36,91,0)');
  var gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient3.addColorStop(0, 'rgba(4,156,227,0.7)');
  gradient3.addColorStop(1, 'rgba(4,156,227,0)');
  var gradient4 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient4.addColorStop(0, 'rgba(148,188,12,0.7)');
  gradient4.addColorStop(1, 'rgba(148,188,12,0)');

  BarChartGradientColors = [gradient1, gradient2, gradient3, gradient4];

});
function display_h1(response) {
  console.log(app_login_userid);

  var ecwUrls = ['https://mdmdseapp.ecwcloud.com', 'https://mdpcmcapp.eclinicalweb.com',
    'https://mdqcmdapp.ecwcloud.com', 'https://mdvgpcapp.ecwcloud.com',
    'https://mdvgpcapp.ecwcloud.com', 'https://mdmpraapp.ecwcloud.com',
    "http://192.168.123.2:8080", 'https://mdmnklapp.ecwcloud.com', 'https://njaaigapp.ecwcloud.com'];

  var athenanetUrl = 'https://athenanet.athenahealth.com';

  var ChepsapeakUrl_1 = 'https://txn2.healthfusionclaims.com';

  var ChepsapeakUrl_2 = 'https://txn3.healthfusionclaims.com';

  var parmjitUrl = 'https://static.practicefusion.com';

  var AshburnUrl = 'https://pm.officeally.com';

  var syedsadiqUrl = 'https://portal.care360.com';

  var pritanSainiUrl = 'https://portal.medgenehr.com';


  var currentsiteUrl = '';
  var dob = '';
  var mobilephone = '';
  var homephone = '';
  var email = '';
  var firstname = '';
  var lastname = '';

  if (netrinUrl == 'https://ecare.netrinhealth.com/') {
    debugger;
    var parameters = response[0].result + '';
    var array = parameters.split(',');
    dob = array[0];
    mobilephone = array[1];
    homephone = array[2];
    email = array[3];
    currentsiteUrl = array[4];
    firstname = array[5];
    lastname = array[6];
    AddressLine1 = array[7];
    AddressLine2 = array[8];
    City = array[9];
    State = array[10];
    // Country=array[11];
    Zipcode = array[11];
    ENSID = array[12];
  }

  else {
    debugger;
    dob = '05/09/1944'; //mmddyyyy
    mobilephone = '';
    homephone = '';
    email = '';
    currentsiteUrl = document.location.origin;
    firstname = 'HOWARD';
    lastname = 'BURROWS';
    AddressLine1 = '';
    AddressLine2 = '';
    City = '';
    State = '';
    // Country='sssss';
    Zipcode = '';
    ENSID = '';
  }

  if (ecwUrls.includes(currentsiteUrl) || athenanetUrl == currentsiteUrl || ChepsapeakUrl_1 == currentsiteUrl || ChepsapeakUrl_2 == currentsiteUrl || parmjitUrl == currentsiteUrl
    || AshburnUrl == currentsiteUrl || syedsadiqUrl == currentsiteUrl || pritanSainiUrl == currentsiteUrl) {

  }

  else {
    if (netrinUrl == 'https://ecare.netrinhealth.com/') {
      var infotab = document.createElement('button');
      infotab.innerHTML = "Please open patient chart.";
      document.querySelector("#tab").style.border = "1px solid #ccc";
      document.querySelector("#tab").style.width = "750px"
      document.querySelector("#tab").appendChild(infotab);
      return;
    }
  }

  var btntabRPM = document.createElement('button');
  btntabRPM.innerText = "RPM";
  btntabRPM.className = 'tablinks rpm-btn';

  btntabRPM.onclick = function () {

    document.querySelector("#rpmUI_DIV").style.display = "";
    document.querySelector("#date_Div").style.display = "";
    document.querySelector("#date_Div").innerHTML = "";
    document.querySelector("#hexplora").innerHTML = "";
    document.querySelector("#hexplora").style.height = "";
    $("#CarePlan_DIV, #CarePlanDownloadDiv, #Refer_div, #Refered").hide();
    if (!_isEnableRPM) {

      info_Dispaly();
      btnWebview.style.display = "none";
      return;
    }

    var birthDate = new Date(dob);
    var difference = Date.now() - birthDate.getTime();
    var ageDate = new Date(difference);
    var calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);

    fetch(netrinUrl + 'EcareAPI/GetRPMDetailsByIDAPI?patientID=' + _patientID).then(data => data.json())
      .then(jokeData => {

        if (jokeData["rmpList"] == null) {
          alert("No records Found");
          return;
        }
        $("#details-name").text(jokeData.Name);
        $("#details-dob").text(dob);
        $("#details-age").text(calculatedAge);
        $("#details-period").text(jokeData.DisplayPeriod);

        showBPGraph(jokeData);
        document.querySelector("#rpmUI_DIV").style.width = "770px";
        document.querySelector("#tab").style.width = "768px";
        hide_info();

        PatientId = jokeData["PatinetId"];
        document.querySelector('#header_logo').style.marginLeft = "240px";

        var colheader = ["Date", "Systolic (mm Hg)", "Diastolic (mm Hg)", "Pulse (BPM)", "Weight (Lb)", "Glucose (mg/dL)"];
        var col = [];
        for (var i = 0; i < jokeData["rmpList"].length; i++) {
          for (var key in jokeData["rmpList"][i]) {
            if (col.indexOf(key) === -1) {
              col.push(key);
            }
          }
        }

        var table = document.createElement("table");
        table.className = "table table-bordered m-b-none";
        var tr = table.insertRow(-1);

        for (var i = 0; i < col.length - 6; i++) {
          var th = document.createElement("th");
          th.innerHTML = colheader[i];
          tr.appendChild(th);
        }

        for (var i = 0; i < jokeData["rmpList"].length; i++) {

          tr = table.insertRow(-1);

          for (var j = 0; j < col.length - 6; j++) {

            if (j < 9) {
              var tabCell = tr.insertCell(-1);

              if (j == 1) {

                tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
                if (jokeData["rmpList"][i][col[9]]) {
                  tabCell.className = jokeData["rmpList"][i][col[8]] == "Alert" ? "cls_warning" : "cls_danger";
                }

              }
              else if (j == 2) {
                tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
                if (jokeData["rmpList"][i][col[10]]) {
                  tabCell.className = jokeData["rmpList"][i][col[8]] == "Alert" ? "cls_warning" : "cls_danger";
                }

              }
              else if (j == 3) {
                tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
                if (jokeData["rmpList"][i][col[11]]) {
                  tabCell.className = jokeData["rmpList"][i][col[8]] == "Alert" ? "cls_warning" : "cls_danger";
                }
              }
              else if (j == 4) {
                tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
              }
              else if (j == 5) {
                tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
              }
              else if (j == 0) {
                tabCell.innerHTML = new Date(jokeData["rmpList"][i][col[j]]).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
              }
            }
          }
        }

        document.querySelector("#rpmUI_DIV").innerHTML = "";
        document.querySelector("#rpmUI_DIV").style.height = "450px";
        document.querySelector("#tab").width = "770px";
        document.querySelector("#tab").style.border = "1px solid #ccc";

        let div1 = document.createElement('div');
        div1.style.float = "right";

        let div2 = document.createElement('div');
        div2.className = "LoadingText";
        div2.innerHTML = "Downloading...";
        div2.id = "LoadingText";


        let btn = document.createElement("button");
        btn.innerHTML = " Export to PDF ";
        btn.className = "btnPDF";
        btn.style.float = "right";
        btn.onclick = function () {
          var datvalue = document.getElementById("filterdate").value.split('-');
          var filterdate = datvalue[1] + "/1/" + datvalue[0] + "-" + datvalue[1] + "/" + lastday(datvalue[0], datvalue[1]) + "/" + datvalue[0];
          window.location = netrinUrl + 'Patients/RPMExportToPdf?PatientId=' + jokeData["PatinetId"] + '&Filterdaterange=' + filterdate;

        };
        div1.appendChild(div2);
        div1.appendChild(btn);

        //Add Drowdown
        function AddDropDownList() {


          var customers = [];

          const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
          for (let i = 0; i < 6; i++) {
            var makedate = new Date(new Date().setMonth(new Date().getMonth() - i));
            var month = makedate.getMonth() + 1;
            var year = makedate.getFullYear();
            var obj = new Object();
            obj.ID = year + '-' + month + '-' + '01';
            obj.Name = months[makedate.getMonth()] + '  ' + year;
            customers.push(obj);
          }



          //Create a DropDownList element.
          var ddlCustomers = document.createElement("SELECT");
          ddlCustomers.style.width = "150px";
          ddlCustomers.setAttribute("id", "filterdate");


          //Add the Options to the DropDownList.
          for (var i = 0; i < customers.length; i++) {
            var option = document.createElement("OPTION");

            //Set Customer Name in Text part.
            option.innerHTML = customers[i].Name;

            //Set CustomerId in Value part.
            option.value = customers[i].ID;

            //Add the Option element to DropDownList.
            ddlCustomers.options.add(option);
          }

          ddlCustomers.addEventListener('change', getSelectDateValue.bind(this.value));

          //Reference the container DIV.
          var dvContainer = document.getElementById("date_Div");


          var newlabel = document.createElement("Label");
          newlabel.innerHTML = "Select Date : ";
          newlabel.style.fontSize = "13px";
          newlabel.style.lineHeight = "30px";
          dvContainer.appendChild(newlabel);
          dvContainer.style.width = "750px";
          dvContainer.style.padding = "5px 10px";
          dvContainer.style.height = "30px";
          dvContainer.appendChild(ddlCustomers);
          dvContainer.appendChild(div1);

        };

        AddDropDownList();

        document.querySelector("#rpmUI_DIV").appendChild(table);

      });

    function getSelectDateValue(e) {
      debugger;
      var selectDate = e.currentTarget.value;
      var patientID = PatientId;
      fetch(netrinUrl + 'EcareAPI/GetRPMDetailsByIDAPI?patientID=' + _patientID + '&date=' + selectDate)
        .then(data => data.json())
        .then(jokeData => {


          if (jokeData["rmpList"] == null) {
            PatientId = patientID;
            alert("No records Found");
            return;
          }
          PatientId = jokeData["PatinetId"];
          $("#details-period").text(jokeData.DisplayPeriod);

          showBPGraph(jokeData);
          var colheader = ["Date", "Systolic (mm Hg)", "Diastolic (mm Hg)", "Pulse (BPM)", "Weight (Lb)", "Glucose (mg/dL)"];
          var col = [];
          for (var i = 0; i < jokeData["rmpList"].length; i++) {
            for (var key in jokeData["rmpList"][i]) {
              if (col.indexOf(key) === -1) {
                col.push(key);
              }
            }
          }

          var table = document.createElement("table");
          table.className = "table table-bordered m-b-none";

          var tr = table.insertRow(-1);

          for (var i = 0; i < col.length - 6; i++) {
            var th = document.createElement("th");
            th.innerHTML = colheader[i];
            tr.appendChild(th);
          }

          for (var i = 0; i < jokeData["rmpList"].length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length - 6; j++) {

              if (j < 9) {
                var tabCell = tr.insertCell(-1);

                if (j == 1) {
                  tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
                  if (jokeData["rmpList"][i][col[9]]) {
                    tabCell.className = jokeData["rmpList"][i][col[8]] == "Alert" ? "cls_danger" : "cls_warning";
                  }
                }
                else if (j == 2) {
                  tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
                  if (jokeData["rmpList"][i][col[10]]) {
                    tabCell.className = jokeData["rmpList"][i][col[8]] == "Alert" ? "cls_danger" : "cls_warning";
                  }
                }
                else if (j == 3) {
                  tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
                  if (jokeData["rmpList"][i][col[11]]) {
                    tabCell.className = jokeData["rmpList"][i][col[8]] == "Alert" ? "cls_danger" : "cls_warning";
                  }
                }
                else if (j == 4) {
                  tabCell.innerHTML = jokeData["rmpList"][i][col[j]];

                } else if (j == 5) {
                  tabCell.innerHTML = jokeData["rmpList"][i][col[j]];
                }
                else if (j == 0) {
                  tabCell.innerHTML = new Date(jokeData["rmpList"][i][col[j]]).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
                }
              }
            }
          }

          document.querySelector("#rpmUI_DIV").innerHTML = "";
          document.querySelector("#rpmUI_DIV").style.height = "450px";

          let tabledeatils = document.createElement('table');
          tabledeatils.className = "table table-bordered m-b-none";
          tabledeatils.style.width = "770px";
          //Create A row 
          document.querySelector("#tab").style.border = "1px solid #ccc";
          document.querySelector("#tab").style.width = "770px";
          document.querySelector("#rpmUI_DIV").appendChild(tabledeatils);
          document.querySelector("#rpmUI_DIV").appendChild(table);
        });
    }

  }

  var btntabCare = document.createElement('button');
  btntabCare.innerText = "CarePlan";
  btntabCare.className = 'tablinks care-btn';

  btntabCare.onclick = function () {
    StartLoader();
    fetch(netrinUrl + 'EcareAPI/GetPatienCarePlan?PatientID=' + _patientID + "&&PdfType=1")
      .then((response) => {

        document.querySelector("#CarePlanDownloadDiv").style.display = "";
        document.querySelector("#CarePlan_DIV").innerHTML = "";
        document.querySelector("#CarePlan_DIV").style.display = "block";
        $("#rpmUI_DIV, #date_Div, #hexplora, #GraphData,#Refered, #Refer_div").hide();

        hide_info();
        if (response.ok) {
          return response.text();
        }
        throw new Error('Something went wrong');
      })
      .then((result) => {
        StopLoader();
        document.querySelector("#CarePlan_DIV").innerHTML = result;
      })
      .catch((error) => {
        StopLoader();
        document.querySelector("#CarePlanDownloadBtn").style.display = "none";
        document.querySelector("#CarePlan_DIV").innerHTML = "<div style='font-size: 18px;'>Patient record not Found</div>";
      });
  }

  var btntabHexplora = document.createElement('button');
  btntabHexplora.innerText = "Patient Profile";
  btntabHexplora.className = 'tablinks p-summary-btn';

  btntabHexplora.onclick = function () {

    document.querySelector("#hexplora").style.display = "";
    document.querySelector("#rpmUI_DIV").innerHTML = "";
    $("#GraphData, #CarePlanDownloadDiv, #CarePlan_DIV, #rpmUI_DIV, #date_Div,#Refer_div, #Refered").hide();

    fetch(netrinUrl + 'EcareAPI/GetPatientProfile?patientID=' + _patientID + '&userId=' + app_login_userid)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then(jokeData => {

        hide_info();
        btnWebview.style.display = '';
        document.querySelector("#hexplora").innerHTML = "";
        document.querySelector("#hexplora").style.height = "450px";
        document.querySelector("#tab").style.width = "770px";
        document.querySelector("#hexplora").style.width = "770px";
        document.querySelector("#tab").style.border = "1px solid #ccc";
        document.querySelector('#header_logo').style.marginLeft = "136px";
        document.querySelector("#GraphData").style.display = "none";

        _providerId = jokeData["ProviderID"];

        // First Div
        var FirstDiV = document.createElement("div");

        FirstDiV.style.marginBottom = "10px";
        FirstDiV.style.float = "left";

        var tblMember = document.createElement("table");
        tblMember.style.float = "left";
        tblMember.style.marginRight = "20px";
        tblMember.style.width = "230px";
        let innerMemberT = "";
        innerMemberT += "<tr><th>Member ID</th><th>Member Name</th></tr>";
        innerMemberT += "<tr><td>" + jokeData["MemberID"] + "</td><td>" + jokeData["MemberName"] + "</td></tr>";
        tblMember.innerHTML = innerMemberT;

        var cost_color = jokeData["High_Cost"] > jokeData["Benchmark"] ? "#ff0000;" : "#DAF7A6;";
        var colr = "background-color:" + cost_color;
        var cost = jokeData["High_Cost"] > jokeData["Benchmark"] ? "Yes (" + "$" + jokeData["High_Cost"] + ")" : "No (" + "$" + jokeData["High_Cost"] + ")";

        var fr = jokeData["ER_Visits_12"] > 4 ? "Yes" : "No";


        var tblHighCost = document.createElement("table");
        tblHighCost.style.float = "left";
        tblHighCost.style.marginRight = "20px";
        tblHighCost.style.width = "230px";
        let innerHCostT = "";
        innerHCostT += "<tr><th>High Cost </th><th>Frequent Flyer</th></tr>";
        innerHCostT += "<tr><td style =" + colr + ">" + cost + "</td><td>" + fr + "</td></tr>";
        tblHighCost.innerHTML = innerHCostT;

        var oncogly = jokeData["Spec_Cost"] > 0 ? "$" + jokeData["Spec_Cost"] : "No";

        var tblOncology = document.createElement("table");
        tblOncology.style.float = "left";
        tblOncology.style.width = "260px";
        let innerOnT = "";
        innerOnT += "<tr><th>Rheumatology/Oncology</th><th>Medications</th></tr>";
        innerOnT += "<tr><td>" + oncogly + "</td><td>" + jokeData["Medications_Cnt"] + "</td></tr>";
        tblOncology.innerHTML = innerOnT;

        FirstDiV.appendChild(tblMember);
        FirstDiV.appendChild(tblHighCost);
        FirstDiV.appendChild(tblOncology);

        document.querySelector("#hexplora").appendChild(FirstDiV);

        // Second Div
        var SecondDiV = document.createElement("div");

        var tblER = document.createElement("table");
        tblER.style.float = "left";
        tblER.style.marginRight = "20px";
        tblER.style.width = "230px";
        let innerERT = "";
        innerERT += "<tr><th>ER (12 Months)</th><th>ER (3 Months)</th></tr>";
        innerERT += "<tr><td>" + jokeData["ER_Visits_12"] + "</td><td>" + jokeData["ER_Visits_3"] + "</td></tr>";
        tblER.innerHTML = innerERT;

        var tblIP = document.createElement("table");
        tblIP.style.float = "left";
        tblIP.style.marginRight = "20px";
        tblIP.style.width = "230px";
        let innerIPT = "";
        innerIPT += "<tr><th>IP (12 Months)</th><th>IP (3 Months)</th></tr>";
        innerIPT += "<tr><td>" + jokeData["IP_Visits_12"] + "</td><td>" + jokeData["IP_Visits_3"] + "</td></tr>";
        tblIP.innerHTML = innerIPT;

        var awv_date = new Date(jokeData["AWV_Due_Date"]) < new Date(jokeData["LstClmDate"]) ? "#ff0000;" : "#DAF7A6;";
        var clr_awv = "background-color:" + awv_date;

        var awv_date_string = new Date(jokeData["AWV_Due_Date"]).toLocaleDateString();

        var tblAWV = document.createElement("table");
        tblAWV.style.width = "260px";
        let innerAWT = "";
        innerAWT += "<tr><th>AWV Code</th><th>AWV Due Date</th></tr>";
        innerAWT += "<tr><td>" + jokeData["AWV_Code"] + "</td><td style=" + clr_awv + ">" + awv_date_string + "</td></tr>";
        tblAWV.innerHTML = innerAWT;

        SecondDiV.appendChild(tblER);
        SecondDiV.appendChild(tblIP);
        SecondDiV.appendChild(tblAWV);

        document.querySelector("#hexplora").appendChild(SecondDiV);

        //Forth div
        var ForthDiv = document.createElement("div");
        ForthDiv.style.float = "left";
        ForthDiv.style.marginBottom = "2px";
        ForthDiv.style.marginTop = "10px";

        var tblRAF = document.createElement("table");
        tblRAF.style.float = "left";
        tblRAF.style.marginRight = "20px";
        tblRAF.style.width = "480px";
        let innerRAF = "";
        innerRAF += "<tr><th>RAFScore</th><th>Prev RAFScore</th><th>Score GAP</th> </tr>";
        innerRAF += "<tr><td>" + jokeData["RAFScore"].toFixed(2) + "+</td><td>" + jokeData["PrevRAFScore"].toFixed(2) + "</td><td>" + jokeData["ScoreGAP"].toFixed(2) + "</td></tr>";

        tblRAF.innerHTML = innerRAF;

        var rpm = jokeData["RPM_Eligible"].toString().trim() == "Yes" ? "#ff0000;" : "#DAF7A6;";
        var rpm_colr = "background-color:" + rpm;
        var tblRPM = document.createElement("table");
        tblRPM.className = "tbl_rpm1";
        tblRPM.style.width = "260px";
        let innerRPM = "";
        innerRPM += "<tr><th>RPM</th> </tr>";
        innerRPM += "<tr><td style = " + rpm_colr + ">" + jokeData["RPM_Eligible"] + "</td></tr>";

        tblRPM.innerHTML = innerRPM;

        //tblRPM.style.marginLeft="500px";

        ForthDiv.appendChild(tblRAF);
        ForthDiv.appendChild(tblRPM);
        document.querySelector("#hexplora").appendChild(ForthDiv);

        // Fivth Div
        var FivthDiv = document.createElement("div");
        FivthDiv.style.float = "left";

        let titlHCC = document.createElement("h3");

        var tblHCC = document.createElement("table");
        tblHCC.style.float = "left";
        tblHCC.style.width = "760px";
        tblHCC.className = "tbl_hccDetails";

        let innerHCC = "";
        innerHCC += "<tr><th>HCC Description</th><th>Diag Code</th><th>Diag Description</th><th>Diag PY</th><th>Diag CY</th><th>Recorded Date</th><th>Recorded By</th></tr>";

        if (jokeData["hCCDetails"] != null) {

          var hccData = jokeData["hCCDetails"];
          for (var i = 0; i < hccData.length; i++) {

            var hdes = hccData[i]["HCCDescription"];
            var diagcode = hccData[i]["DIAGCode"].toString().trim();
            var diagdes = hccData[i]["DiagDescription"].toString().trim();
            var diagPy = hccData[i]["DiagPY"].toString().trim() == "Y" ? "Yes" : "No";

            var clr_py = diagPy == "Yes" ? "background-color:" + "#DAF7A6;" : "background-color:" + "#ff0000;";
            var diagcy = hccData[i]["DiagCY"].toString().trim() == "Y" ? "Yes" : "No";
            var clr_cy = diagcy == "Yes" ? "background-color:" + "#DAF7A6;" : "background-color:" + "#ff0000;";
            //var recordeddate = hccData[i]["LastRecordedDate"].toString().split("T")[0];
            var recordeddate = hccData[i]["LastRecordedDate"] ? hccData[i]["LastRecordedDate"].toString().split("T")[0] : "-";
            if (recordeddate === "0001-01-01") {
              recordeddate = "-";
            }

            var recordedby = hccData[i]["LastRecordedBy"].toString().trim();
            innerHCC += "<tr><td>" + hdes + "</td><td>" + diagcode + "</td><td>" + diagdes + "</td><td style = " + clr_py + ">" + diagPy + "</td><td style=" + clr_cy + ">" + diagcy + "</td><td>" + recordeddate + "</td><td>" + recordedby + "</td></tr>";
          }

        } else {
          innerHCC += "<tr><td>-</td><td>-</td><td>-</td><td>-</td><td>-<td><td>-</td><td>-</td></tr>";
        }

        tblHCC.innerHTML = innerHCC;
        // tblHCC.style.display = "none";

        FivthDiv.appendChild(titlHCC);
        FivthDiv.appendChild(tblHCC);

        document.querySelector("#hexplora").appendChild(FivthDiv);

        // Third Div
        var ThirdDiv = document.createElement("div");
        ThirdDiv.style.float = "left";
        ThirdDiv.style.marginBottom = "2px";
        ThirdDiv.style.clear = "both";

        let titlexp = document.createElement("h3");
        titlexp.innerHTML = "Expenditure :";

        var btn_exp = document.createElement('button');
        // img.src ="plus-icon.png";
        btn_exp.id = "plus";
        btn_exp.innerHTML = "Click to open";
        btn_exp.style.marginLeft = "3px";
        btn_exp.onclick = function () {
          if (btn_exp.id == "minus") {
            document.getElementsByClassName('tbl_expenditure')[0].style.display = "none";
            btn_exp.innerHTML = "Click to open";
            btn_exp.id = "plus";
          } else {
            document.getElementsByClassName('tbl_expenditure')[0].style.display = "";
            btn_exp.innerHTML = "Click to close";
            btn_exp.id = "minus";
          }
        }

        titlexp.style.display = "flex";
        titlexp.style.alignItems = "center";
        titlexp.appendChild(btn_exp);
        var tblExp = document.createElement("table");
        tblExp.style.float = "left";
        tblExp.style.marginRight = "20px";
        tblExp.style.width = "480px";
        tblExp.className = "tbl_expenditure";
        let innerEXP = "";

        innerEXP += "<tr><th>Category</th><th>2019</th><th>2020</th><th>2021</th><th>2022</th> </tr>";
        innerEXP += "<tr><td>Emergrncy Room (ER)</td><td>$" + jokeData["ERcost_3"] + "</td><td>$" + jokeData["ERcost_2"] + "</td><td>$" + jokeData["ERcost_1"] + "</td><td>$" + jokeData["ERcost_0"] + "</td></tr>";
        innerEXP += "<tr><td>Inpatient (IP)</td><td>$" + jokeData["IPcost_3"] + "</td><td>$" + jokeData["IPcost_2"] + "</td><td>$" + jokeData["IPcost_1"] + "</td><td>$" + jokeData["IPcost_0"] + "</td></tr>";
        innerEXP += "<tr><td>Other Cost(Non ER/IP)</td><td>$" + jokeData["OTcost_3"] + "</td><td>$" + jokeData["OTcost_2"] + "</td><td>$" + jokeData["OTcost_1"] + "</td><td>$" + jokeData["OTcost_0"] + "</td></tr>";
        innerEXP += "<tr><td>Total Cost</td><td>$" + jokeData["Totalcost_3"] + "</td><td>$" + jokeData["Totalcost_2"] + "</td><td>$" + jokeData["Totalcost_1"] + "</td><td>$" + jokeData["Totalcost_0"] + "</td></tr>";
        tblExp.innerHTML = innerEXP;

        tblExp.style.display = "none";
        ThirdDiv.appendChild(titlexp);
        ThirdDiv.appendChild(tblExp);
        //ThirdDiv.appendChild(tblRPM);

        document.querySelector("#hexplora").appendChild(ThirdDiv);

        // SixDIV

        var SixDIV = document.createElement("div");
        SixDIV.style.float = "left";
        SixDIV.style.marginBottom = "10px";

        var subdiv1_sixdiv = document.createElement("div");
        subdiv1_sixdiv.style.float = "left";
        subdiv1_sixdiv.style.marginRight = "20px";
        subdiv1_sixdiv.style.width = "480px";
        subdiv1_sixdiv.style.clear = "both";

        let titelQP = document.createElement("h3");
        titelQP.innerHTML = "Quality Gaps :";

        var btn_qp = document.createElement('button');
        // img.src ="plus-icon.png";
        btn_qp.id = "hcc_plus";
        btn_qp.innerHTML = "Click to open";
        btn_qp.style.marginLeft = "3px";
        btn_qp.onclick = function () {
          if (btn_qp.id == "hcc_minus") {
            document.getElementsByClassName('tbl_QP')[0].style.display = "none";
            btn_qp.innerHTML = "Click to open";
            btn_qp.id = "hcc_plus";
            document.getElementById('hcc_plus').innerHTML = "Click to open";
          } else {
            document.getElementsByClassName('tbl_QP')[0].style.display = "";
            btn_qp.innerHTML = "Click to close";
            btn_qp.id = "hcc_minus";
            document.getElementById('hcc_minus').innerHTML = "Click to close";
          }
        }

        titelQP.style.display = "flex";
        titelQP.style.alignItems = "center";

        titelQP.appendChild(btn_qp);

        var tblQp = document.createElement("table");
        tblQp.className = "tbl_QP";

        let innerQP = "";

        innerQP += "<tr><th>Measure Name</th><th>Gap</th> </tr>";

        if (jokeData["qualityGaps"] != null) {
          var qualityGapsdata = jokeData["qualityGaps"];
          for (var i = 0; i < qualityGapsdata.length; i++) {
            var MeasureName = qualityGapsdata[i]["MeasureName"];
            var MeasureValue = qualityGapsdata[i]["MeasureValue"].toString().trim() == "Y" ? "Yes" : "No";
            var clr_msv = MeasureValue == "No" ? "background-color:" + "#DAF7A6;" : "background-color:" + "#ff0000;";
            innerQP += "<tr><td>" + MeasureName + "</td><td style = " + clr_msv + ">" + MeasureValue + "</td></tr>";
          }
        }
        else {
          innerQP += "<tr><td>-</td><td>-</td></tr>";
        }

        tblQp.innerHTML = innerQP;

        subdiv1_sixdiv.appendChild(titelQP);
        subdiv1_sixdiv.appendChild(tblQp);

        var subdiv2_sixdiv = document.createElement("div");
        subdiv2_sixdiv.style.float = "left";
        subdiv2_sixdiv.style.width = "270px";

        let titelEr = document.createElement("h3");
        titelEr.innerHTML = "ER Visits :";

        var btn_Er = document.createElement('button');
        // img.src ="plus-icon.png";
        btn_Er.id = "hcc_plus";
        btn_Er.innerHTML = "Click to open";
        btn_Er.style.marginLeft = "3px";
        btn_Er.onclick = function () {
          if (btn_Er.id == "hcc_minus") {
            document.getElementsByClassName('tbl_ERV')[0].style.display = "none";
            btn_Er.innerHTML = "Click to open";
            btn_Er.id = "hcc_plus";
            document.getElementById('hcc_plus').innerHTML = "Click to open";
          } else {
            document.getElementsByClassName('tbl_ERV')[0].style.display = "";
            btn_Er.innerHTML = "Click to close";
            btn_Er.id = "hcc_minus";
            document.getElementById('hcc_minus').innerHTML = "Click to close";
          }
        }

        titelEr.style.display = "flex";
        titelEr.style.alignItems = "center";

        titelEr.appendChild(btn_Er);

        var tblErVists = document.createElement("table");
        tblErVists.className = "tbl_ERV";
        let innerErVists = "";
        innerErVists += "<tr><th>Diagnosis Description</th><th>Dgns Code</th><th>Diagnosis Category</th> </tr>";

        if (jokeData["eRVisits"] != null) {

          var ErData = jokeData["eRVisits"];

          for (var i = 0; i < ErData.length; i++) {

            var DiagnosisDescription = ErData[i]["DiagnosisDescription"];
            var DgnsCD = ErData[i]["DgnsCD"];
            var DiagnosisCategory = ErData[i]["DiagnosisCategory"];
            innerErVists += "<tr><td>" + DiagnosisDescription + "</td><td>" + DgnsCD + "</td><td>" + DiagnosisCategory + "</td></tr>";
          }

        } else {
          innerErVists += "<tr><td>-</td><td>-</td><td>-</td></tr>";
        }

        tblErVists.innerHTML = innerErVists;

        subdiv2_sixdiv.appendChild(titelEr);
        subdiv2_sixdiv.appendChild(tblErVists);

        SixDIV.appendChild(subdiv1_sixdiv);
        SixDIV.appendChild(subdiv2_sixdiv);
        document.querySelector("#hexplora").appendChild(SixDIV);
        document.getElementsByClassName('tbl_QP')[0].style.display = "none";
        document.getElementsByClassName('tbl_ERV')[0].style.display = "none";

      }).catch((error) => {

        info_Dispaly();
      });
  };

  var btntabRefer = document.createElement('button');
  btntabRefer.innerText = "Refered";
  btntabRefer.className = 'tablinks Refer-btn';

  btntabRefer.onclick = function () {
    document.querySelector("#Refer_div").style.display = "";
    document.querySelector("#Refered").style.display = "";
    document.querySelector("#rpmUI_DIV").innerHTML = "";
    $("#GraphData, #CarePlanDownloadDiv, #CarePlan_DIV, #rpmUI_DIV, #date_Div,#hexplora").hide();
    $(".btn-Refer").show();
    $(".success").hide()
  }

  var btnWebview = document.createElement('button');
  btnWebview.innerText = "eCare Web";
  btnWebview.className = 'tablinks webview-btn';
  btnWebview.style.display = 'none';

  btnWebview.onclick = function () {
    chrome.tabs.create({ url: 'https://ecare.netrinhealth.com/ProviderSummary/MemberProfile?ProviderID=' + _providerId });
  }
  debugger;
  fetch(netrinUrl + 'EcareAPI/GetExtenstionsAPI?dob=' + dob + '&mobilephone=' + mobilephone + '&homephone=' + homephone + '&EmailId=' + email +
    '&firstname=' + firstname + '&lastname=' + lastname + '&AddressLine1=' + AddressLine1 + '&AddressLine2=' + AddressLine2 +
    '&City=' + City + '&State=' + State + '&Zipcode=' + Zipcode + '&ENSID=' + ENSID)

    .then(data => data.json())
    .then(jokeData => {
      document.querySelector("#date_Div").innerHTML = "";
      if (jokeData["PatinetId"] == 0) {

        var infoTab = document.createElement('button');
        infoTab.className = "info_tab";
        infoTab.innerHTML = "Patient record not found.";
        // document.querySelector("#tab").style.border = "1px solid #ccc";
        document.querySelector("#tab").appendChild(infoTab);
        return;
      }
      else {
        _patientID = jokeData["PatinetId"];
        _isEnableRPM = jokeData["IsEnrolledToRPM"];

      }

      //document.querySelector("#tab").style.border = "1px solid #ccc";
      var netrintabLogo = document.createElement('img');
      netrintabLogo.src = "/Images/NetrinHeade_logo.png";
      netrintabLogo.id = "header_logo";
      netrintabLogo.style.width = "150px";
      netrintabLogo.style.right = "17px";
      netrintabLogo.style.position = "absolute";

      document.querySelector("#tab").appendChild(btntabRPM);
      document.querySelector("#tab").appendChild(btntabCare);
      document.querySelector("#tab").appendChild(btntabHexplora);
      document.querySelector('#tab').appendChild(btntabRefer)
      document.querySelector("#tab").appendChild(btnWebview);
      //addDropdownForMulPatinets();
      document.querySelector("#tab").appendChild(netrintabLogo);
    });
}

function getCookies(domain, name, callback) {
  chrome.cookies.get({ "url": domain, "name": name }, function (cookie) {
    if (callback) {
      if (cookie != null) {
        callback(cookie.value);
      } else {
        callback("");
      }
    }
  });
}
//usage:
getCookies(netrinUrl, "user_id", function (id) {

  var cookie = id.toString();
  console.log(cookie);
  app_login_userid = cookie;

  if (cookie.length > 1) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      tab_title = tab.title;
      debugger;
      chrome.scripting.executeScript({

        target: { tabId: tab.id },
        files: ['Property.js'],
      },
        display_h1
      );

    });

  }
  else {
    document.querySelector("#id2").innerHTML = "";
    document.querySelector("#id2").style.margin = "50px 50px 50px 50px";

    document.querySelector("#id2").style.display = "flex";

    var div = document.createElement("div");
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";

    let img = document.createElement("img");
    img.src = "netrin-health-logo-darkblue.png";
    img.className = "icon_netrin";
    div.appendChild(img);

    let btn = document.createElement("button");
    btn.innerHTML = "Login to ECare";
    btn.className = "btnPDF"
    btn.onclick = function () {
      chrome.tabs.create({ url: netrinUrl });
    };

    let h3 = document.createElement("h3");
    h3.innerHTML = "Population Health Management Suite"

    document.querySelector("#id2").appendChild(div);
    document.querySelector("#id2").appendChild(h3);
    document.querySelector("#id2").appendChild(btn);

  }
});

function info_Dispaly() {

  if (document.getElementsByClassName('info_tab')[0] == undefined) {
    var infoTab = document.createElement('div');
    infoTab.className = "info_tab";
    infoTab.innerHTML = "Patient record not found";
    document.querySelector("#infoTab").appendChild(infoTab);
    infoTab.style.fontSize = "20px";
    document.querySelector("#tab").style.width = "770"
    document.querySelector('#header_logo').style.marginLeft = "5px";
    return;
  } else {
    document.getElementsByClassName('info_tab')[0].remove();
    var infoTab = document.createElement('div');
    infoTab.className = "info_tab";
    infoTab.innerHTML = "Patient record not found.";
    infoTab.style.fontSize = "20px";

    document.querySelector("#tab").style.width = "770px"
    document.querySelector('#header_logo').style.marginLeft = "5px";
    //document.querySelector("#hexplora").style.border = "1px solid #ccc";
    document.querySelector("#hexplora").appendChild(infoTab);
    return;
  }

}

function hide_info() {
  if (document.getElementsByClassName('info_tab')[0] != undefined) {
    document.getElementsByClassName('info_tab')[0].remove();
  }
}

var lastday = function (y, m) {
  return new Date(y, m, 0).getDate();
};

function DownloadCarePlanData() {
  var form = document.createElement("form");
  form.action = netrinUrl + "/Patients/DownloadPdf";
  var inp = document.createElement("input");
  inp.name = "responseData";
  inp.value = document.getElementById("CarePlan_DIV").innerHTML;
  form.appendChild(inp);
  form.click();
  var x = '<form action="' + netrinUrl + "/Patients/DownloadPdf" + '" method="POST">';
  x += '<input type="hidden" name="responseData" value="' +
    document.getElementById("CarePlan_DIV").innerHTML + '" />';
  x += '<input type="hidden" name="Program" value="' + parseInt($('input[name="Program"]').val()) + '" />';
  x + '</form>';
  $(x).appendTo('body').submit();
  $('body').find('input[name="responseData"]').remove();

}

window.onload = function () {
  document.getElementById("CarePlanDownloadBtn").addEventListener('click', () => {
    window.location.href = netrinUrl + "Patients/GenerateInvoice_New1?PatientId=" + _patientID + "&&PdfType=1&&IsForExtension=true";
  });
};

function showBPGraph(jokeData) {
  BPBarChartData = [jokeData["BPMorning"], jokeData["BPAfterNoon"], jokeData["BPEvening"], jokeData["BPNight"]];
  GlucoseBarChartData = [jokeData["GluMorning"], jokeData["GluAfterNoon"], jokeData["GluEvening"], jokeData["GluNight"]];
  WeightBarChartData = [jokeData["WtMorning"], jokeData["WtAfterNoon"], jokeData["WtEvening"], jokeData["WtNight"]];

  var SelectedGraphval = $("#Rpm_Graphs").val();

  BPSystolicObj = [];
  BPDiastolicObj = [];
  BPXLabels = [];
  PulseObj = [];
  GlucoseXLabels = [];
  GlucosObj = [];
  WeightXLabels = [];
  WeightObj = [];
  jokeData["rmpList"].forEach((item, index) => {
    if (parseInt(item.Systolic) > 0 && parseInt(item.Diastolic) > 0 && parseInt(item.Pulse) > 0) {
      BPSystolicObj.unshift(item.Systolic != "?" ? item.Systolic : 0);
      BPDiastolicObj.unshift(item.Diastolic != "?" ? item.Diastolic : 0);
      BPXLabels.unshift(new Date(item.Date).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }));
      PulseObj.unshift(item.Pulse != "?" ? item.Pulse : 0);
    }
    if (parseInt(item.Glucose) > 0) {
      GlucoseXLabels.unshift(new Date(item.Date).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }));
      GlucosObj.unshift(item.Glucose);
    }
    if (parseInt(item.Weight) > 0) {
      WeightXLabels.unshift(new Date(item.Date).toLocaleString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }));
      WeightObj.unshift(item.Weight);
    }
  });

  if (SelectedGraphval == "BPPulseChart") {
    showBPChart();
    $("#graphHeading").html("BP Graph");
  } else if (SelectedGraphval == "WeightChart") {
    showWeightChart();
    $("#graphHeading").html("Weight Graph");
  } else {
    showGlucoseChart();
    $("#graphHeading").html("Glucose Graph");
  }
  $("#GraphData").css("display", "block");
  $(".chart-data").css("display", "none");

  $("#TimeChart").css("display", "block");
  $(".nav-btn").css("display", "none");
  $(".nav-btn." + SelectedGraphval).css("display", "flex");
}

$(document).ready(function () {
  $(".grph-btn").click((item) => {

    if (item.target.value == "BPTimeChart") {
      showBarChart(BPBarChartData);
    } else if (item.target.value == "WtTimeChart") {
      showBarChart(WeightBarChartData);
    } else if (item.target.value == "GluTimeChart") {
      showBarChart(GlucoseBarChartData);
    } else if (item.target.value == "BPChart") {
      showBPChart();
    } else if (item.target.value == "PulseChart") {
      showPulseChart();
    } else if (item.target.value == "GlucoseChart") {
      showGlucoseChart();
    } else if (item.target.value == "WeightChart") {
      showWeightChart();
    }
    $("#graphHeading").html(item.target.textContent);
  });
  $("#Rpm_Graphs").change((item) => {

    $(".nav-btn").css("display", "none");
    $("." + item.target.value).css("display", "flex");

    if (item.target.value == "BPPulseChart") {
      showBPChart();
      $("#graphHeading").html("BP Graph");
    } else if (item.target.value == "WeightChart") {
      showWeightChart();
      $("#graphHeading").html("Weight Graph");
    } else {
      showGlucoseChart();
      $("#graphHeading").html("Glucose Graph");
    }

  });
});

function StartLoader() {
  $(".loadingDiv").show();
}
function StopLoader() {
  $(".loadingDiv").hide();
}

function showBarChart(BarChartData) {
  var barGraphLabels = ['Morning', 'Afternoon', 'Evening', 'Night'];
  var barColors = [];
  var SortedData = Array.from(BarChartData);
  SortedData.sort((a, b) => a - b);
  barColors.push(BarChartGradientColors[SortedData.indexOf(BarChartData[0])]);
  barColors.push(BarChartGradientColors[SortedData.indexOf(BarChartData[1])]);
  barColors.push(BarChartGradientColors[SortedData.indexOf(BarChartData[2])]);
  barColors.push(BarChartGradientColors[SortedData.indexOf(BarChartData[3])]);

  let chartStatus = Chart.getChart("TestChart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  new Chart("TestChart", {
    type: "bar",
    data: {
      labels: barGraphLabels,
      datasets: [{
        backgroundColor: barColors,
        borderColor: [
          BorderColors[SortedData.indexOf(BarChartData[0])],
          BorderColors[SortedData.indexOf(BarChartData[1])],
          BorderColors[SortedData.indexOf(BarChartData[2])],
          BorderColors[SortedData.indexOf(BarChartData[3])]],
        borderWidth: 1,
        barPercentage: 0.5,
        data: BarChartData
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: {
            display: false,
          }
        },
        y: {
          grid: {
            color: "rgba(239,239,239,0.9)"
          }
        }

      }
    }
  });

}

function showBPChart() {
  let chartStatus = Chart.getChart("TestChart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  new Chart("TestChart", {
    type: "line",
    data: {
      labels: BPXLabels,
      datasets: [{
        fill: false,
        backgroundColor: "#14245b",
        borderColor: "#14245b",
        pointBackgroundColor: function (context) {
          return context.dataset.data[context.dataIndex] > 170
            ? 'red'
            : '#14245b';
        },
        data: BPSystolicObj,
        label: "BP Systolic"
      },
      {
        fill: false,
        backgroundColor: "#049ce3",
        borderColor: "#049ce3",
        pointBackgroundColor: function (context) {
          return context.dataset.data[context.dataIndex] > 110
            ? 'red'
            : '#049ce3';
        },
        data: BPDiastolicObj,
        label: "BP Diastolic"
      }]
    },
    options: {
      legend: { display: false },
      scales: {
        x: {
          display: false //this will remove all the x-axis grid lines
        },
        y: {
        }
      }
    }
  });
}

function showPulseChart() {
  var Labels = BPXLabels.map(t => t.toLocaleString([], { month: '2-digit', day: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }));
  LoadChart("line", Labels, PulseObj, "Pulse", "#14245b", "#14245b)", 110.00, "#14245b");
}

function showWeightChart() {
  LoadChart("line", WeightXLabels, WeightObj, "Weight", "#14245b", "#14245b", 235.00, "#14245b");
}

function showGlucoseChart() {
  LoadChart("line", GlucoseXLabels, GlucosObj, "Glucose", "#14245b", "#14245b", 250.00, "#14245b");
}

function LoadChart(type, labels, data, legend, backgroundColor, borderColor, limit, altColor) {
  let chartStatus = Chart.getChart("TestChart"); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  new Chart("TestChart", {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        fill: false,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        pointBackgroundColor: function (context) {
          return context.dataset.data[context.dataIndex] > limit
            ? 'red'
            : altColor;
        },
        data: data,
        label: legend
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          display: false //this will remove all the x-axis grid lines
        }
      }
    }
  });
}

function InsertData() {
  debugger;
  var comment = $(".t_area").val();
  fetch(netrinUrl + 'EcareAPI/InsertExtenstionsAPI?patientID=' + _patientID + '&Comment=' + comment + '&userId=' + app_login_userid)
  $(".btn-Refer").hide()
  document.querySelector(".success").innerHTML = "<div style='font-size: 18px;'>You have been referred successfully</div>";
  $(".success").show()
  $('.t_area').val('');
}