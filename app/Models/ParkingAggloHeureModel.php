<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 27/04/2019
 * Time: 01:16
 */

namespace Models;


use Core\Model;
use Entite\ParkingAggloEntite;
use Helpers\Database;

class ParkingAggloHeureModel extends Model
{
    const F_DATETIME    = "Datetime";
    const F_NAME        = "Name";
    const F_SOMME_FREE  = "`SUM(Free)`";
    const F_SOMME_TOT   = "`SUM(Total)`";

    private $f_datetime     = self::F_DATETIME;
    private $f_name         = self::F_NAME;
    private $f_somme_free   = self::F_SOMME_FREE;
    private $f_somme_tot    = self::F_SOMME_TOT;

    private $table = Database::PAH ;

    public function __construct()
    {
        parent::__construct();
    }

    public function getAggloLastWeekForCode($code)
    {
        $ps = [
            ":code" => $code
        ];
        $sql = "SELECT pa.$this->f_datetime , pa.$this->f_name , $this->f_somme_free as free , $this->f_somme_tot as total FROM 
                $this->table pa 
                WHERE $this->f_name = :code 
                AND $this->f_datetime >= NOW() - INTERVAL 7 DAY
                ORDER BY 1 ASC";

        return $this->db->select($sql , $ps , \PDO::FETCH_CLASS , ParkingAggloEntite::class);
    }
}