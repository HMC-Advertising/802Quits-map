<?php

    // Add Shortcode
    function map_shortcode( $atts ) {

        // Attributes
        extract( shortcode_atts(
            array(
                "height" => "800px"
            ), $atts )
        );

        $output = "";

        $key ="AIzaSyCIa2v-3vDuTOp_UDMpuuzv7mFyzpOlFrM";
        $url ="http://maps.googleapis.com/maps/api/js?key=".$key."&sensor=false";
        //$url ="http://maps.google.com/maps?file=api&v=3&key=".$key;
       
        $output .="<script type='text/javascript' src='".$url."'></script>";
       
        if(is_mobile()){
            $output .='<style>#map img{ width:auto !important;}</style>';
            $output .= "<div id='map' style='height:300px; margin-bottom:50px; margin-top:20px; margin-left:-30px; margin-right:-30px;'></div>";
            //$output .="<script type='text/javascript' src=".plugins_url("assets/script/main-mobile.js", __FILE__)."></script>";
        } 
        else{
            $output .= "<div id='map' style='height:".$height."; margin-bottom:50px; margin-top:20px'></div>";
            //$output .="<script type='text/javascript' src=".plugins_url("assets/script/main.js", __FILE__)."></script>";
        }

        return $output;

    }
    add_shortcode( 'map', 'map_shortcode' );

    function map_list($atts){
         // Attributes
        extract( shortcode_atts(
            array(
                "url" => "https://spreadsheets.google.com/feeds/list/1uTZF62iI-rGeBc_7ss5sdUyPJjseboXkn1ByCo2Eb6E/od6/public/values?alt=json"
            ), $atts )
        );

        $data = json_decode(file_get_contents($url), true);

        $data = $data['feed']['entry'];
     
        $output = "";

        $output .= '<div id="map_list" style="padding-bottom:40px">';

        $gh = get_bloginfo("url");
        $gh = "http://69.195.124.243/~myheamm2/grpre/";


       foreach ((array)$data as $d) {
            $town;
            switch($d['gsx$town']['$t']){
                case "Barre":
                    $town = "Barre";
                    $link = "12";
                break;
                 case "Bennington":
                    $town = "Bennington";
                    $link = "14";
                break;
                 case "Bradford":
                    $town = "Bradford";
                    $link = "21";
                break;
                 case "Brattleboro":
                    $town = "Brattleboro";
                    $link = "13";
                break;
                 case "Burlington":
                    $town = "Burlington";
                    $link = "11";
                break;
                 case "Middlebury":
                    $town = "Middlebury";
                    $link = "22";
                break;
                 case "Morrisville":
                    $town = "Morrisville";
                    $link = "18";
                break;
                 case "Newport":
                    $town = "Newport";
                    $link = "17";
                break;
                 case "Randolph":
                    $town = "Randolph";
                    $link = "19";
                break;
                 case "Rutland":
                    $town = "Rutland";
                    $link = "15";
                break;
                 case "Springfield":
                    $town = "Springfield";
                    $link = "16";
                break;
                 case "St. Albans":
                    $town = "St. Albans";
                    $link = "23";
                break;
                 case "St. Johnsbury":
                    $town = "St. Johnsbury";
                    $link = "24";
                break;
                 case "Windsor":
                    $town = "Windsor";
                    $link = "25";
                break;
            }

            $output .= '<div class="town">';
              
                    $output .= '<h2>'.$d['gsx$town']['$t'].'<span style="font-weight:400"> | '.$d['gsx$county']['$t'].' County</small></h2>';
                    $output .= '<article class="place">';
                        $output .= "<strong>".$d['gsx$nameoftheplace']['$t'] . "</strong><br>";
                        $output .= $d['gsx$address']['$t'].'<br>';
                    $output .= '</article>';
                    $output .= '<article class="owner" style="padding-top:5px;">';
                        $output .= "<strong>".$d['gsx$nameoftheeventowner']['$t'] . "</strong><br>";
                        $output .= '<a href="mailto:'.$d['gsx$email']['$t'] .'">'.$d['gsx$email']['$t'].'</a><br>';
                        $output .= '<a href="tel:'.$d['gsx$phonenumber']['$t'].'">'.$d['gsx$phonenumber']['$t'].'</a>';
                    $output .= '</article>';
                    if($d['gsx$morethanone']['$t'] == "yes"){
                        $output .= '<article class="owner" style="padding-top:5px;">';
                            $output .= "<strong>".$d['gsx$ndname']['$t'] . "</strong><br>";
                            $output .= '<a href="mailto:'.$d['gsx$ndemail']['$t'] .'">'.$d['gsx$ndemail']['$t'].'</a><br>';
                            $output .= '<a href="tel:'.$d['gsx$ndphone']['$t'].'">'.$d['gsx$ndphone']['$t'].'</a>';
                        $output .= '</article>';
                    }
                    $output .="<div style='margin-top:10px'>";
                        $output .='<a class="serviceLink" href="'.$gh.'calendar/action~agenda/request_format~html/tag_ids~'.$link.'">Go to ' .$town. ' Service Area Events <i class="fa fa-arrow-right"></i></a> ';
                    $output .="</div>";    

                    
            
            $output .='</div>';
        }

        $output .= '</div>';


        return $output; 

     
    }
    add_shortcode("map_list", "map_list");

