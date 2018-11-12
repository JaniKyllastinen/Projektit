<?php
   $nimi = $_REQUEST["tilaaja"];
   $sahkoposti = $_REQUEST["sahkoposti"];
   $puhelinumero = $_REQUEST["puhelinumero"];
   $osoite = $_REQUEST["osoite"];
   $tilaus = $_REQUEST["tilaukset"];
   
    //estetään HTML-tagien käyttäminen
   $nimi = htmlspecialchars($nimi);
   $sahkoposti = htmlspecialchars($sahkoposti);
   $puhelinumero = htmlspecialchars($puhelinumero);
   $osoite = htmlspecialchars($osoite);
   $tilaus = htmlspecialchars($tilaus);

   $rivi = $nimi . ';' . $sahkoposti . ';' .  $puhelinumero . ';' .  $osoite . ';' . $tilaus . "\n";

   $tiedosto = 'tilaukset.txt';

   // Avataan tiedosto
      $kaikki = file_get_contents($tiedosto);

   // Lisätään uusi rivi loppuun
      $kaikki .= $rivi;

   // Tallennetaan kaikki rivit takaisin 
      file_put_contents($tiedosto, $kaikki);

	
?>