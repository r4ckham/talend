<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 2019-03-12
 * Time: 22:23
 */

?>

<div id="container"></div>

<script>
    var ajaxUrl = "<?= DIR . \Helpers\Url::URL_DASH_AJAX ?>";

    parkingController.init(ajaxUrl , "container");

</script>

