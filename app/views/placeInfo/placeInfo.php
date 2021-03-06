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
                v-model="code"
                @input="changeCode"
        ></place-titre>

    <div class="row">
        <place-infos-day :frees="infosDay.frees" class="col-lg-6"></place-infos-day>
        <place-infos-week :frees="infosWeek.frees" class="col-lg-6"></place-infos-week>
    </div>


    <div class="row" style="margin-top: 15px">
        <place-agglo-heure :occupations="aggloHeures" class="col-lg-6"></place-agglo-heure>
        <place-agglo-jour :occupations="aggloJours" class="col-lg-6"></place-agglo-jour>
    </div>
</div>

<script>
    var ajaxUrl = "<?= DIR . \Helpers\Url::URL_PLACE_AJAX ?>";
</script>
