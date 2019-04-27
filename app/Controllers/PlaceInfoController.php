<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 26/04/2019
 * Time: 22:55
 */

namespace Controllers;


use Core\Controller;
use Core\View;
use Helpers\Assets;
use Helpers\hError;
use Helpers\Tools;
use Helpers\Url;
use Models\ParkingAggloHeureModel;
use Models\ParkingAggloJourModel;
use Models\ParkingModel;

class PlaceInfoController extends Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data = [];
        $data["PAGE_TITTLE"] = "Information Détaillée Place";

        View::renderTemplate('header', $data);

        Assets::js([
            Url::templatePath() . "js/place/place.info.titre.js",
            Url::templatePath() . "js/place/place.info.infos.js",
            Url::templatePath() . "js/place/place.info.agglo.heure.js",
            Url::templatePath() . "js/place/place.info.agglo.jour.js",
            Url::templatePath() . "js/place/place.info.app.js",
        ]);

        View::render('placeInfo/placeInfo', $data);
        View::renderTemplate('footer', $data);

    }

    public function ajax()
    {
        $dbg = [];
        $action = Tools::getPost("action");
        $dbg["action"] = $action;


        if($action == "init-all-data"){
            $this->initAllData($dbg);
        }
    }

    private function initAllData(&$dbg)
    {
        $name = Tools::getPost("name");
        $dbg["name"] = $name;

        $model = new ParkingModel();
        $infos = $model->getDataByNameForWeek($name);

        $model = new ParkingAggloHeureModel();
        $aggloHeure = $model->getAggloLastWeekForCode($name);

        $model = new ParkingAggloJourModel();
        $aggloJour = $model->getAggloLastWeekForCode($name);

        $data = [
            "status"    => hError::NO_ERROR,
            "message"   => hError::getMessage(hError::NO_ERROR),
            "infos"     => $infos,
            "aggloHeure"=> $aggloHeure,
            "aggloJour" => $aggloJour,
            "dbg"       => $dbg,
        ];
        echo json_encode($data);
        exit;
    }
}