<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 2019-03-12
 * Time: 22:48
 */

namespace Controllers;


use Core\Controller;
use Core\View;
use Helpers\Assets;
use Helpers\hError;
use Helpers\Tools;
use Helpers\Url;
use Models\ParkingModel;

class DashboardController extends Controller
{
    /**
     * Define Index page title and load template files.
     */
    public function index()
    {

        $data = [];
        $data["PAGE_TITTLE"] = "Données en temps en réel (24h)";

        View::renderTemplate('header', $data);

        Assets::js([
            Url::templatePath() . "js/dashboard/parking.controller.js",
            Url::templatePath() . "js/dashboard/widget.line.parking.js",
        ]);

        View::render('dashboard/dashboard', $data);
        View::renderTemplate('footer', $data);


        exit;
    }

    public function ajax()
    {
        $action = Tools::getPost("action");

        if($action == "get_parking_data_day"){
            $this->getParkingDataDay($dbg);
        }
    }

    private function getParkingDataDay(&$dbg)
    {
        $name = Tools::getPost("name");
        $dbg["name"] = $name;

        $model = new ParkingModel();

        $infos = $model->getDataByNameForDay($name);

        $data = [
            "status" => hError::NO_ERROR,
            "message" => hError::getMessage(hError::NO_ERROR),
            "infos" => $infos,
            "dbg" => $dbg,
        ];
        echo json_encode($data);
        exit;
    }
}