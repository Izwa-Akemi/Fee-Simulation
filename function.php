<?php
function sanitize($a) { 
    $_a = array(); 
    foreach($a as $key=>$value) { 
        if (is_array($value)) { 
//$valueが配列なら$_aを$keyがある分サニタイズ関数を通して配列に入れる
            $_a[$key] = sanitize($value); 
        } else { 
//$valueが配列以外なら$_aを$keyがある分htmlspecialcharsして配列に入れる
            $_a[$key] = htmlspecialchars($value); 
        } 
    } 
    return $_a; 
} 

$_POST = sanitize($_POST);

?>