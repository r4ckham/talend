<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 2019-03-11
 * Time: 10:21
 */

namespace Controllers;


use Core\Controller;
use Core\View;
use Helpers\hError;
use Helpers\hUrl;
use Helpers\hUser;
use Helpers\Session;
use Helpers\Url;
use Models\UserModel;

class LoginController extends Controller
{
    /**
     * Call the parent construct.
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function ajax()
    {
        $action = Tools::getPost("action");

    }

    public function index()
    {
        $data = [];

        View::renderTemplate('header', $data);
        View::render('login/login', $data);
        View::renderTemplate('footer', $data);

        exit;
    }

    public function login()
    {
        $log = $_POST["mail"];
        $pwd = $_POST["password"];

        if(empty($log) || empty($pwd)){
            hUrl::redirectFromError(Url::URL_WELCOME, hError::USER_NOT_EXIST);
        }

        $model = new UserModel();
        $user = $model->getUserByMailAndPwd($log , $pwd);

        if(empty($user)){
            hUrl::redirectFromError(Url::URL_WELCOME, hError::BAD_PASSWORD);
        }

        hUser::setUser($user);
        Url::redirect(Url::URL_DASHBOARD);

    }

    public function logout()
    {
        Session::destroy();
        Url::redirect("");

    }



}