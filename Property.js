function GetDetails() {

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

  var pritanSainiUrl = 'https://portal.medgenehr.com'

  var Capital = '/15482/89';

  var currentsiteUrl = '';
  var dob = '';
  var mobilephone = '';
  var homephone = '';
  var email = '';
  var firstname = '';
  var lastname = '';
  var AddressLine1 = '';
  var AddressLine2 = '';
  var City = '';
  var State = '';
  var Zipcode = '';
  var ENSID = '';

  currentsiteUrl = document.location.origin;
  currentsitePathName = document.location.pathname;
  if (ecwUrls.includes(currentsiteUrl)) {
    dob = document.querySelector("[ng-bind='PatientHubInfo.dateOfBirth']").innerHTML;

    if (document.querySelector("[ng-bind='PatientHubInfo.mobilePhone']") != null) {
      mobilephone = document.querySelector("[ng-bind='PatientHubInfo.mobilePhone']").innerText;
    }

    if (document.querySelector("[ng-if='PatientHubInfo.homePhone']") != null) {
      homephone = document.querySelector("[ng-if='PatientHubInfo.homePhone']").innerText;
    }

    if (document.querySelector("[ng-if='PatientHubInfo.emailAddress']") != null) {
      email = document.querySelector("[ng-if='PatientHubInfo.emailAddress']").childNodes[0].lastElementChild.innerText;
    }

    if (document.getElementsByClassName('pat-hub-info')[0] != null) {
      var Names = document.getElementsByClassName('pat-hub-info')[0].childNodes[1].title + '';
      var array = Names.split(",");
      lastname = array[0];
      firstname = array[1];
    }

    if (document.querySelector("[ng-bind='trimPatientDetails(PatientHubInfo.fullAddr,50)']") != null) {
      var fulladdres = document.querySelector("[ng-bind='trimPatientDetails(PatientHubInfo.fullAddr,50)']").innerText.split(",");
      AddressLine1 = fulladdres[0];
      City = fulladdres[1];
      State = fulladdres[2].split("-")[0];
      Zipcode = fulladdres[2].split("-")[1];
      ENSID = document.querySelector("[ng-bind='PatientHubInfo.accountno']").innerText;
    }
  }
  ///
  else if (athenanetUrl == currentsiteUrl && currentsitePathName.includes(Capital)) {
    var mainframe = document.body.childNodes[5].contentDocument.childNodes[0].getElementsByTagName('frameset')[0].children[2].contentDocument.children[0].getElementsByClassName('frmainwrapper')[0].children[0].contentDocument.getElementsByClassName('readonlydisplaytable');
    firstname = mainframe[0].tBodies[0].rows[0].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    lastname = mainframe[0].tBodies[0].rows[2].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    dob = mainframe[0].tBodies[0].rows[7].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
  }

  else if (athenanetUrl == currentsiteUrl) {
    var mainframe = document.body.childNodes[5].contentDocument.childNodes[0].getElementsByTagName('frameset')[0].children[2].contentDocument.children[0].getElementsByClassName('frmainwrapper')[0].children[0].contentDocument.getElementsByClassName('readonlydisplaytable');
    firstname = mainframe[0].tBodies[0].rows[0].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    lastname = mainframe[0].tBodies[0].rows[3].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    dob = mainframe[0].tBodies[0].rows[9].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    homephone = mainframe[0].tBodies[0].rows[17].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    AddressLine1 = mainframe[0].tBodies[0].rows[11].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    AddressLine2 = '';
    City = mainframe[0].tBodies[0].rows[13].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    State = mainframe[0].tBodies[0].rows[14].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    Zipcode = mainframe[0].tBodies[0].rows[15].getElementsByClassName('readonlydisplayfielddata')[0].innerText;
    ensid = document.body.childNodes[5].contentDocument.childNodes[0].getElementsByTagName('frameset')[0].children[2].contentDocument.children[0].getElementsByClassName('frmainwrapper')[0].children[0].contentDocument.getElementsByClassName('Heading c__page-header')[0];
    if (ensid != undefined) {
      var ENSID = ensid.innerText.split("#")[2];
    }
  }

  else if (ChepsapeakUrl_1 == currentsiteUrl || ChepsapeakUrl_2 == currentsiteUrl) {
    firstname = document.getElementById('PtntPnl').closest('td').querySelector('h2').innerText.split(",")[1].trim().split(" ")[0];
    lastname = document.getElementById('PtntPnl').closest('td').querySelector('h2').innerText.split(",")[0];

    // firstname = document.getElementById('PtntPnl').closest('td').querySelector('h2').innerText.split(" ")[1];
    // lastname = document.getElementById('PtntPnl').closest('td').querySelector('h2').innerText.split(",")[0];
    dob = document.getElementById('PtntPnl').querySelector("#patDOB").innerText.split(" ")[0];
    var addresArr = document.getElementById('PtntPnl').querySelector("#patAddress").innerText.split('\n');
    AddressLine1 = addresArr[0];
    //AddressLine2 = addresArr.length == 3 ? addresArr[1] : "";
    AddressLine2 = '';
    City = addresArr.length == 3 ? addresArr[1].split(',')[0] : addresArr[2].split(',')[0];
    //Country='';
    State = addresArr.length == 3 ? addresArr[1].split(',')[1].trim().split(' ')[0] : addresArr[2].split(',')[1].trim().split(' ')[0];
    Zipcode = addresArr.length == 3 ? addresArr[1].split(',')[1].trim().split(' ')[1] : addresArr[2].split(',')[1].trim().split(' ')[1];
    ENSID = document.getElementById('PtntPnl').querySelector("#patAcct").innerText.split(' ')[0];

    var Names = document.getElementById('PtntPnl').closest('td').querySelector('h2').innerText + '';
    var array = Names.split(",");
  }

  else if (parmjitUrl == currentsiteUrl) {
    dob = document.querySelector("[data-element='patient-ribbon-dob']").innerText;
    var names = document.querySelector("[data-element='patient-ribbon-patient-name']").innerText.split(' ');
    firstname = names[0];
    lastname = names[1];
  }

  else if (AshburnUrl == currentsiteUrl) {
    firstname = document.querySelector("[id='ctl00_phFolderContent_myPatientHeader_lblFirstName']").innerText;
    lastname = document.querySelector("[id='ctl00_phFolderContent_myPatientHeader_lblLastName']").innerText;
    dob = document.querySelector("[id='ctl00_phFolderContent_myPatientHeader_lblDOB']").innerText.split(' ')[0];
  }

  else if (syedsadiqUrl == currentsiteUrl) {
    firstname = document.querySelector("[id='patientName']").children[0].innerText.split(',')[1].split(' ')[1];
    lastname = document.querySelector("[id='patientName']").children[0].innerText.split(',')[0].split(' ')[0];
    dob = document.querySelector("[id='patientDOB']").innerText;
  }

  else if (pritanSainiUrl == currentsiteUrl) {
    var data = document.querySelector('div:not(.x-hide-display)[id^="chartTab"]').children[0].children[0].children[2].getElementsByClassName('x-panel-header-text')[0].innerText.split(' ');
    firstname = data[0];
    lastname = data[1];
    dob = data[3];
  }

  else {
  }

  return dob + "," + mobilephone + ","
    + homephone + ","
    + email + ","
    + currentsiteUrl + ","
    + firstname + ","
    + lastname + ','
    + AddressLine1 + ','
    + AddressLine2 + ','
    + City + ','
    // + Country + ',' 
    + State + ','
    + Zipcode + ','
    + ENSID;
}
GetDetails();