<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 2019-04-19
 * Time: 16:48
 */

namespace Models;


use Core\Model;
use Helpers\Database;

class ParkingModel extends Model
{
    const F_DATETIME= "Datetime";
    const F_NAME    = "name";
    const F_STATUS  = "status";
    const F_FREE    = "free";
    const F_TOTAL   = "total";

    private $f_datetime = self::F_DATETIME;
    private $f_name     = self::F_NAME;
    private $f_status   = self::F_STATUS;
    private $f_free     = self::F_FREE;
    private $f_total    = self::F_TOTAL;

    private $table = Database::USR;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param String $mail
     * @param String $pwd
     * @return UserEntite|null
     */
    public function getDataByPeriod($dateMin , $dateMax)
    {


        $ps = [
            ":dateMin"=> $dateMin ,
            ":dateMax" => $dateMax,
        ];

        $sql = "SELECT * FROM $this->table ";
        $sql.= "WHERE $this->f_datetime <= :dateMin ";
        $sql.= "AND $this->f_datetime >= :dateMax";

        $rows = $this->db->select($sql , $ps , \PDO::FETCH_CLASS , UserEntite::class);

        if(empty($rows)){
            return null;
        }

        return $rows[0];
    }
}