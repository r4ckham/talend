<?php
/**
 * Sample layout.
 */
use Core\Language;
use Helpers\Url;

?>

<div class="login-box">
    <div class="login-logo">
        <a href="../../index2.html"><b>Admin</b>LTE</a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <form action="<?= DIR . Url::URL_LOGIN ?>" method="post">
            <div class="form-group has-feedback">
                <input name="mail" type="email" class="form-control" placeholder="Email">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input name="password" type="password" class="form-control" placeholder="Password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-flat">Se connecter</button>
            <hr>
            <a href="#" class="btn btn-danger btn-block btn-flat">J'ai oublier mon mot de passe !</a>
            <a href="<?=DIR . Url::URL_NEW_USER ?>" class="btn btn-success btn-block btn-flat">Devenir Membre !</a>

        </form>

    </div>
    <!-- /.login-box-body -->
</div>