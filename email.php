<?php

	
	//ini_set ("sendmail_from","mail@unexo-labs.com");


	// Assign contact info
	$name = stripcslashes($_REQUEST['name']);
	$emailAddr = stripcslashes($_REQUEST['email']);
	$comment = stripcslashes($_REQUEST['query']);
	$subject = "Query via unexo-labs.com";
	//$from_add = ini_get("sendmail_from");
	$from_add = $emailAddr;
	$to_add = "unexo@unexo-labs.com"; //<-- put your yahoo/gmail email address here
	//$subject = "Test Subject";
	//$message = "Test Message";


	
	// Set headers
	//$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers = "From: $from_add \r\n";
	$headers .= "Reply-To: $emailAddr \r\n";
	$headers .= "Return-Path: $from_add\r\n";
	$headers .= "X-Mailer: PHP \r\n";

	// Format message
	$contactMessage =  
	"<div>
	<p><strong>Name:</strong> $name <br />
	<strong>E-mail:</strong> $emailAddr <br />

	<p><strong>Message:</strong> $comment </p>

	<p><strong>Sending IP:</strong> $_SERVER[REMOTE_ADDR]<br />
	<strong>Sent via:</strong> $_SERVER[HTTP_HOST]</p>
	</div>";

	// Send and check the message status
	$response = (mail($to_add, $subject, $contactMessage, $headers) ) ? "success" : "failure" ;
	$output = json_encode(array("response" => $response));
	
	header('content-type: application/json; charset=utf-8');
	echo($output);	
?>