
//////////////////////////////////////////////////////////////////
//////Kaikki koodit ovat w3css tuottamia tässä tiedostossa////////
//////////////////////////////////////////////////////////////////
// functio ostoskorin avaamiseen
function w3_open() {
    var x = document.getElementById("mySidebar");
    x.style.width = "300px";
    x.style.paddingTop = "3%";
    x.style.display = "block";
}

// ostoskorin sulkemiseen
function w3_close() {
    //document.getElementById("mySidebar").style.display = "none";
	$("#mySidebar").fadeOut();
}

// hampurilais menuun avaaminen ja sulkeminen
function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
//tabien avaamiseen koodi on otettu w3css tabs osiosta
function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-deep-orange", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " w3-deep-orange";
}