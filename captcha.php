<?php
if (isset($_POST['g-recaptcha-response'])) {
    $captcha = $_POST['g-recaptcha-response'];
} else {
    $captcha = false;
}

if (!$captcha) {
    console.log("No Captcha!");
} else {
    $secret   = '6LfnbZUaAAAAAL_ZihPrFoTALeyD0dPzb2TkWGn3';
    $response = file_get_contents(
        "https://www.google.com/recaptcha/api/siteverify?secret=" . $secret . "&response=" . $captcha . "&remoteip=" . $_SERVER['REMOTE_ADDR']
    );
    // use json_decode to extract json response
    $response = json_decode($response);

    //console.log($response->score)

    //if ($response->success === false) {
    //    console.log("Captcha error!");
    //}

    if($response["success"]) {
        echo json_encode(array('success' => 'true'));
    } else {
        echo json_encode(array('success' => 'false'));
    }
}

//... The Captcha is valid you can continue with the rest of your code
//... Add code to filter access using $response . score
//if ($response->success==true && $response->score <= 0.5) {
    //Do something to denied access
//}
?>
