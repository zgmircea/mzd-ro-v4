<?php
session_start();

    $doc = new DOMDocument();
    
    $url= str_replace("/projects/","", $_SERVER[REQUEST_URI]);

    if($_SESSION['nda']==true){
        $doc->loadHTMLFile($url);
    }else
        $doc->loadHTMLFile("nda.html");

    echo $doc->saveHTML();

?>