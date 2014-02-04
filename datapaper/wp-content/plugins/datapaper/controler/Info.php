<?php




class Info {

    private $info;
    private $dataBase;
    

    public function setInfo($info) {
        $this->info = $info;
        
    }

    public function addPrivate(){
        global $current_user;
      get_currentuserinfo();
        $out=["private"=>[ "edit_by" => ["url" => $_SERVER['HTTP_HOST'], "name" => $current_user->user_login  ]]];
        $this->info= array_merge($this->info,  $out);

      }
    public function sendInfo() {
     return $this->actionInfo('post');

    }
    public function deleteInfo() {
       $this->actionInfo('delete');
    }
   public function actionInfo($type) {
        if (!empty($this->info)) {
            $this->info = json_encode($this->info);
        }
        $result = $this->dataBase->send('/', $type, $this->info);
        return $result->getBody(true);
    }
    public function makeConnection() {
        $this->dataBase = new CouchDB(Configuration::$DBName, Configuration::$DBUrl, Configuration::$DBPort,Configuration::$DBUser,  Configuration::$DBCouch);
    }
}

?>
