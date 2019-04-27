<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 2019-04-21
 * Time: 16:53
 */

namespace Entite;


use Models\ParkingAggloJourModel;

class ParkingAggloEntite
{

    public function getDatetime()
    {
        return $this->{ParkingAggloJourModel::F_DATETIME};
    }

    public function getName()
    {
        return $this->{ParkingAggloJourModel::F_NAME};
    }

    public function getSommeFree()
    {
        return $this->{ParkingAggloJourModel::F_SOMME_FREE};
    }

    public function getSommeTotal()
    {
        return $this->{ParkingAggloJourModel::F_SOMME_TOT};
    }
}