<?php
include("php_library/parametres.php");

echo "<body><p>behold the final mysql parameters<ul><li>dsn: '$dsn',</li> <li>user: '$user',</li> <li>pass: '$pass',</li> </ul></p> $dbglog </body>";

var_dump($_ENV);

phpinfo();
?>