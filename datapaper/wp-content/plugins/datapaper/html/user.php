<?php

if (is_author()) {

add_action('admin_init', 'datapaper_admin_menu');
add_action('wp_ajax_add_user', 'add_user_callback');
//add_action('wp_ajax_search_user', 'search_user_callback');
add_action('wp_ajax_add_uri_user', 'add_uri_user_callback');

add_action('wp_ajax_search_entities', 'search_entities_callback');
add_action('wp_ajax_add_uri_from_post', 'add_uri_from_post_callback');

add_action('admin_menu', 'dp_menu_user');

}

add_action( 'admin_init', 'datapaper_plugin_init' );

function datapaper_plugin_init(){
    add_action('wp_ajax_send_info', 'send_info_callback');
    add_action('wp_ajax_delete_info', 'delete_info_callback');
   wp_enqueue_script('dp-plugin-script');
}


function datapaper_user() {
    echo '<script type="text/javascript">var urlPath="'.plugin_dir_url(__FILE__).'../img/";</script>'
    ?>

    <div id="datapaper">
        <?php
            insert_modal();
        ?>

        <div id="header">
        
          
            
        </div> <!-- header -->

         <div id="index_profile_publi">
            
            
            
         </div> <!-- header -->
  
  
        <h4>Vos publications :</h4>
        
        <div id="datapaper_search">
            <?php
            global $current_user;
            get_currentuserinfo();
            $result = DP_SQL::DP_get_URI($current_user->ID);

            if(count($result)>0){
                
            echo '<div id="key">';
            foreach ($result as $key => $value) {
                echo '<input type="button" class="btn btn-primary" data-value="' . $value->uri . '" value="' . $value->name . '" /><br/><br/>';
            };
            echo '</div>';
          
            }else{
               echo '<h3>You dont have any entity to add resources to.</h3>'; 
            }
            
            ?>
   
        </div>
        <div id="datapaper_info">

        </div>

        <div id="datapaper_command" class="buttoncontainer" hidden="">
          <?php
             // echo '<img src="'.plugin_dir_url(__FILE__).'../img/add.png" onclick="DP_addMoreInfo(null,true)" />'; 
          ?>
          <div id="addmoreinfo">
          <button type="button" id="datapaper_add_more_info" class="btn btn-success" onclick="DP_addMoreInfo(null,true)">Add</button>
          </div>
            <button type="button" id="datapaper_send" class="button button-primary" onclick="DP_sendValue()">Send</button>
          <!--<button type="button" id="datapaper_delete" onclick="DP_DeleteValue()" class="button button-secondary">Delete</button>-->
            <button type="button" id="datapaper_cancel" class="button button-secondary" onclick="DP_cancel()">Cancel</button>
        </div>    



    </div>

    <?php
}


function send_info_callback() {
    $info = new Info();
    $info->makeConnection();
    $info->setInfo($_POST['value']);
    $info->addPrivate();
    echo json_encode($info->sendInfo());
    die();
}

function delete_info_callback() {
    $info = new Info();
    $info->makeConnection();
    $info->setInfo($_POST['value']);
    $info->addPrivate();
    //  $info->deleteInfo();
    die();
  
}

?>
