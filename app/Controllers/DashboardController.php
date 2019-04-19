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

class DashboardController extends Controller
{
    /**
     * Define Index page title and load template files.
     */
    public function index()
    {
        $data = [];

        View::renderTemplate('header', $data);
        View::render('dashboard/dashboard', $data);
        View::renderTemplate('footer', $data);
        exit;
    }
}