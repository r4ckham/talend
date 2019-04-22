<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 2019-04-19
 * Time: 23:06
 */

namespace Entite;


use Models\ParkingModel;

class ParkingEntite
{
    public function getDatetime()
    {
        return $this->{ParkingModel::F_DATETIME};
    }

    public function getTotal()
    {
        return $this->{ParkingModel::F_TOTAL};
    }

    public function getFree()
    {
        return $this->{ParkingModel::F_FREE};
    }

    public function getStatus()
    {
        return $this->{ParkingModel::F_STATUS};
    }

    public function getName()
    {
        return $this->{ParkingModel::F_NAME};
    }
}