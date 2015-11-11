<?php

$url ="https://spreadsheets.google.com/feeds/list/1uTZF62iI-rGeBc_7ss5sdUyPJjseboXkn1ByCo2Eb6E/od6/public/values?alt=json";

$data = json_decode(file_get_contents($url));
echo "<pre>";
var_dump($data);
echo "</pre>";