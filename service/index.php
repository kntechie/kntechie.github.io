<?php

//including the required files
require '.././lib/Slim/Slim.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->post('/test', function () use ($app) {
	echo "Hello";
});

$app->run();