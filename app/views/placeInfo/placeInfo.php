<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 26/04/2019
 * Time: 22:57
 */

?>

<div id="app">
        <place-titre
                :titre="titre"
                :total="total"
                :last-date="lastDate"
                :status="status"
                :code="code"
        ></place-titre>
        <place-infos :frees="infos.frees"></place-infos>

    <div class="row">
        <place-agglo-heure :occupations="aggloHeures" class="col-lg-6"></place-agglo-heure>
        <place-agglo-jour :occupations="aggloJours" class="col-lg-6"></place-agglo-jour>
    </div>
</div>

<script>
    var ajaxUrl = "<?= DIR . \Helpers\Url::URL_PLACE_AJAX ?>";
</script>
