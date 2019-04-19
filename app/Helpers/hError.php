<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 18/11/2018
 * Time: 20:53
 */

namespace Helpers;
use Helpers\Session;


class hError
{

    const PASSWORD_NOT_MATCH    = 198;
    const BAD_PASSWORD          = 199;
    const NO_ERROR              = 200;
    const INSERT_OK             = 201;
    const NO_USER               = 601;
    const NO_RIGHT              = 602;
    const NOT_FOUND             = 604;
    const NOT_ALLOWED           = 605;
    const NO_FIELD              = 608;
    const NO_DATA               = 609;
    const NO_DATA_GIVEN         = 610;
    const NO_LOT_FOUND          = 612;
    const DATE_UNVALID          = 613;
    const TOKEN_NOT_FOUND       = 620;
    const USER_ALREADY_EXIST    = 621;
    const USER_NOT_EXIST        = 622;
    const NOT_ENOUGH_DATA       = 623;
    const NOT_CONNECTED         = 624;

    private static $errors = [
        // Password Errors
        self::BAD_PASSWORD          => "Mot de passe incorrect !",
        self::PASSWORD_NOT_MATCH    => "Les mots de passes ne corresspondent pas !",

        // Machine Errors
        self::NO_ERROR  => "OK",
        self::INSERT_OK => "INSERT",

        // IHM
        self::NO_USER               => "Aucun utilisateur trouvé !",
        self::NO_RIGHT              => "Pas de droit !",
        self::NOT_FOUND             => "Action non trouvée !",
        self::NOT_ALLOWED           => "Action non autorisée !",
        self::NO_FIELD              => "Aucune correspondance en bd !",
        self::NO_DATA               => "Aucune données !",
        self::NO_DATA_GIVEN         => "Aucune données transmise !",
        self::NO_LOT_FOUND          => "Emplacement non trouvé !",
        self::DATE_UNVALID          => "Dates invalides !",
        self::TOKEN_NOT_FOUND       => "Demande d'initialisation non trouvée !",
        self::USER_ALREADY_EXIST    => "Utilisateur déjà existant !",
        self::USER_NOT_EXIST        => "L'identifiant n'existe pas !",
        self::NOT_ENOUGH_DATA       => "Ooops des champs n'ont pas été remplis !",
        self::NOT_CONNECTED         => "Merci de vous connecter pour effectuer cette action",
    ];

    public static function getMessage($error)
    {
        return self::$errors[$error];
    }

    public static function setMessage($error)
    {
        Session::set("danger" , self::getMessage($error));
    }
}