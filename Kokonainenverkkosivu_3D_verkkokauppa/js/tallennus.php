<?php
   $nimi = $_REQUEST["nimi"];
   $viesti = $_REQUEST["viesti"];
    //estetään HTML-tagien käyttäminen
   $nimi = htmlspecialchars($nimi);
   $viesti = htmlspecialchars($viesti);
   //muutetaan rivinvaihdot HTML-muotoon
   $viesti = str_replace("\n", "<br/>", $viesti);
   $rivi = $nimi . ';' . $viesti . "\n";

   $tiedosto = 'palautteet.txt';

   // Avataan tiedosto
      $kaikki = file_get_contents($tiedosto);

   // Lisätään uusi rivi loppuun
      $kaikki .= $rivi;

   // Tallennetaan kaikki rivit takaisin 
      file_put_contents($tiedosto, $kaikki);

	
?>