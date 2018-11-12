//"What is 3DD" modaalin aukaisu...
function infoOpen()
{
	document.getElementById('id01').style.display='block';
}
//"What is 3DD" modaalin sulkeminen...
function infoClose()
{
	$("#id01").fadeOut();
	$("#contactReply").fadeOut();
	$("#errorReply").fadeOut();
}
// Hampurilais menuun aukaisu
function menuClose()
{
	$("#navDemo").removeClass("w3-show");
}
// kaikkien modaalien ja ostoskorin sulku(kutsutaan kun painetaan lopulta "Order")
function allClose()
{
	$("#orderReply").fadeOut();
	$("#checkInModal").fadeOut();
	w3_close();
	$("#list").html("");
	$("#allProducts").html("");
}
//ERROR modaalin aukaisu
function errorOpen()
{
	$("#errorReply").show();
}

$(document).ready(function()// kun sivu on latautunut
{
	//Globaali muuttuja ostoskorin maksimi määrään ja kuinka paljon ne maksavat
	var cartMax = 0;
	var allProductsPrice = 0;
	
	//Kun painetaan tuotteen "+" merkkiä
	//Lisää käyttäjän klikatun tuotteen ostoskoriin ja laskee hinnan
	$(".product").click(function()
	{
		
		//testi että nappi toimii kuten halutaan
		console.log("lisäsit tuotteen ostoskoriin");
		// Kun + nappia painetaan function hakee painetun napin ympäriltä alla oleviin muuttujiin
		// tiedot.
		
		//syote muuttuja on klikatun tuotteen nimi
		var syote = $(this).prev("h3").text();
		//klikatun  tuotteen hinta
		var price = $(this).next("h4").text();
		//klikatun tuotteen kuvaus
		var descript = $(this).next().next().next().next("p").text();
		// klikatun tuotteen määrä "quantity"
		var badgeNumber = $(this).next().next().next("input").val();
		//tulostus ostoskoriin jossa tiedot lyödään yhteen ja muunnetaan "li" elementiksi, diviksi ja 
		//jokaiselle lisätään poisto buttoni
		$("<li onclick='openCartProducts(product" + cartMax + ")' class='w3-button w3-block w3-left-align w3-deep-orange'>" + syote + "<span class='w3-badge'> " + badgeNumber + "</span></li>" + 
		"<button id='deleteFromCart' class='w3-button'><i class='fa fa-remove'></i></button><div id='product" + cartMax + "' class='w3-container w3-light-grey w3-hide'><p>" + price + "<br/>" + descript + "</p></p></div>").appendTo("#list").hide().fadeIn(1000);
		//lisätään globaaliin muuttujaan 1
		cartMax++;
		// muunnetaan price muuttuja numeroksi ja otetaan siitä vain ensimmäiset 2 merkkiä
		price = Number(price.substr(0,2));
		//lisätään ostoskorin yhteis hintaan kertomalla se ensin samojen tuotteiden määrällä
		allProductsPrice = allProductsPrice + (price * badgeNumber);
		// tulostetaan consolee yhteis hinta varmistukseksi
		console.log(allProductsPrice);
		//lopuksi hinnan tulostus ostoskoriin
		$("#allProducts").html(allProductsPrice + " €");
	});
	
	//Kun painetaan custom formin tilaus painiketta
	$("#customOrder").click(function()
	{
		
		//custom tilauksen muuttujat määrälle, nimelle, korkeudelle, leveyden ja kuvaukselle
		var badgeNumber = $("#customQuantity").val();
		var customName = $("#customName").val();
		var customHeight = $("#customHeight").val();
		var customWidth = $("#customWidth").val();
		var customDescript = $("#customDescript").val();
		// tulostaminen ostoskoriin
		if(badgeNumber != "" && customName != "" && customHeight != "" && customWidth != "" && customDescript != "")
		{
			$("<li onclick='openCartProducts(product" + cartMax + ")' class='w3-button w3-block w3-left-align w3-deep-orange'>" + customName + "<span class='w3-badge'> " + badgeNumber + "</span></li>" + 
			"<button id='deleteFromCart' class='w3-button'><i class='fa fa-remove'></i></button><div id='product" + cartMax + "' class='w3-container w3-light-grey w3-hide'><p> Height is " + customHeight + " and Width is " + customWidth + "<br/>" + customDescript + "</p></p></div>").appendTo("#list").hide().fadeIn(1000);
			//maksimimäärän nostaminen
			cartMax++;
			//formin kenttien tyhjennys
			customName = $("#customName").val('');
			customHeight = $("#customHeight").val('');
			customWidth = $("#customWidth").val('');
			customDescript = $("#customDescript").val('');
			badgeNumber = $("#customQuantity").val('');
		}
		else
		{
			errorOpen();
		}
	});
	
	// kun klikataan tuotteen poisto painiketta "x"
	$(document).on("click", "button#deleteFromCart", function()
	{
		//aluksi piilotetaan sen jälkeen poistetaan koko li elementti ja sen sisältö
		$(this).prev("li").fadeOut(1000, function(){
			$(this).prev("li").remove();
		});
		// samanaikaisesti haetaan hinta ja kerroin
		var deletedPrice = $(this).next("div").text();
		var multiplier = $(this).prev().children("span").text();
		//jonka jälkeen poistetaan ne
		$(this).next("div").remove();
		$(this).remove();
		// muunnetaan numeroksi
		deletedPrice = Number(deletedPrice.substring(0,2));
		multiplier = Number(multiplier);
		//poistetaan klikatun tuotteen hinta kokonais hinnasta
		allProductsPrice = allProductsPrice - (deletedPrice * multiplier);
		//tulostetaan uudelleen hinta
		$("#allProducts").html(allProductsPrice + " €");
	});
	//Check In modaalin aukaisu ja sulkeminen
	$(document).on("click", "button#checkIn", function(){
		console.log("kassalle")
		$("#checkInModal").css("display", "block");
	});
	$(document).on("click", "span#closeCheckModal", function(){
		console.log("pois kassalta")
		$("#checkInModal").fadeOut();
	});
	
	
	//palautteiden tallennus palautteet.txt tiedostoon
	$(function(){	
		$("#contactSend").click(function(){
			//palaute formin nimi ja viesti osioiden muuttujat
			var nimi = $("#cName").val();
			var viesti = $("#cMessage").val();
			if( nimi != "" && viesti != "")
			{
				 $.ajax({
						 method: "POST",
						 url: "js/tallennus.php",
						 data: { nimi:nimi,viesti:viesti }
				  })
						.done(function( msg ) {
							//kun lähetys on valmis avataan kiitos palautteesta modaali
							$("#contactReply").show();
						});
				//tyhjennetään formin kentät
				$("#cName").val('');
				$("#cMessage").val('');
			}
			else
			{
				errorOpen();
			}
		});
	});
	//Order file save to tilaus.txt
	$(function(){	
		$("#endOrder").click(function(){
			//lopullisen tilauksen formin muuttujat
			var tilaajanNimi = $("#oName").val();
			var sPosti = $("#oEmail").val();
			var phoneNumber = $("#oPhone").val();
			var address = $("#oAddress").val();
			// tuotteiden tiedot ostorkorista
			var OrderInfo = $("#list").children("li").text();
			var nameAndQuant = OrderInfo;
			if(tilaajanNimi != "" && sPosti != "" && phoneNumber != "" && address != "")
			{
				 $.ajax({
						 method: "POST",
						 url: "js/tilaus.php",
						 data: { tilaaja:tilaajanNimi,sahkoposti:sPosti,puhelinumero:phoneNumber,osoite:address,tilaukset:nameAndQuant }
				  })
						.done(function( msg ) {
							// kun lähetys valmis näytetään kiitos tilauksesta modaali
							$("#orderReply").show();
						});
				// tyhjennetään formin kentät ja nollataan yhteishinta ja ostoskorin maksimi määrä
				$("#oName").val('');
				$("#oEmail").val('');
				$("#oPhone").val('');
				$("#oAddress").val('');
				allProductsPrice = 0;
				cartMax = 0;
			}
			else
			{
				errorOpen();
			}
		});
	});
	
	
});
//w3css valmis koodi ostoskorin tuotteiden tuotekuvausten näyttämiseen
function openCartProducts(id) {
    var x = id;
    if (x.className.indexOf("w3-show") == -1) {
		
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
