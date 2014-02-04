var i = 0;
var id;
var  notGenerated = true;

var pageDce = 0;

jQuery(document).ready(
        function() {

alert("ok");
         
var tr = '<tr>';

            jQuery(document).on('focus', 'input.special', function() {

                jQuery(this).popover('show');
            });
            jQuery(document).on('click', '#key input[type="button"]', function() {

                DP_searchValeu(this);
            });
        });
function DP_searchValeu(obj) {

    id = jQuery(obj).attr('data-value');

    if (id != "") {
        jQuery.ajax({
             url: "http://localhost:5984/datapaper/_design/public/_view/by_all2?",
            //url: "http://dataconf.liris.cnrs.fr:5984/datapaper/_design/public/_view/by_all2",
            data: 'key="' + id + '"',
            crossDomain: true,
            dataType: 'jsonp'
        }).done(function(data) {
            if (data.rows[0] == null) {
                DP_addTable(null, true);
                i = 0;
            } else {
                DP_addTable(data.rows[0].value, true);
                
            }
        });
    }
}
function DP_addTable(value, editable) {
    DP_cancel();
    jQuery('#datapaper_search').hide();
    jQuery('#datapaper_command').show();
    var out = '<form id="datapaperForm"><table class="table"><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody id="data">';
    out += "</tbody></table>";
    jQuery("#datapaper_info").append(out);
    out = '<tr><div id="basic"><td>URI</td><td id="_id">' + id + '<input type="hidden" name="_id" value="' + id + '" /></td></tr>';
   
    if (value !== null) {
        out += '<tr type="hidden" style="display:none"><td>Revision</td><td id="_rev">' + value._rev + '<input type="hidden" name="_rev" value="' + value._rev + '" /></td></tr></div>';
    }
    jQuery("#data").append(out);

    DP_addMoreInfo(value, editable);
}

function DP_addMoreInfo(value, editable) {

    /*

    Pour afficher un TextArea a chaque fois qu'on clique sur une option
    Reactiver l'affichage car avant on la désactivé au cas ou le user
    Veut modifier la valeur de l'Option sans avoir a généré un autre TextArea
    */
    notGenerated = true;

    alert("ok");

pageDce = 0;
    var out = '';
    if (value !== null) {
        // alert(value.public.length);
        for (var j = 0; j < value.public.length; j++) {

            for (key in value.public[j]) {


                out += '<tr><td>' + key + '</td><td>';
              
                if (editable) {
                    /*
                    if (key == 'description') {
                        out += '<textarea class="erasable" name="public[' + j + '][' + key + ']" >' + value.public[j][key] + '</textarea>';

                    } else if (key == 'type') {
                        out += '<input class="special erasable" data-toggle="popover" data-placement="right" data-original-title="Examples" data-content="html, pdf, user-photo, user-twitter, user-web, user-phone" type="text" name="public[' + j + '][' + key + ']" value="' + value.public[j][key] + '"/>';

                    } else {

                        */
                        out += '<input class="erasable "  type="text" name="public[' + j + '][' + key + ']" value="' + value.public[j][key] + '"/>';

                 //   }
                }

                 else {
                    out += value.public[j][key];
                }
                out += ' </td></tr>';

            }
        }
        i = value.public.length;
        /*
        for (var key in value.private.edit_by) {
        //    alert('private key' + key);
            out += '<tr><td>' + key + '</td><td>' + value.private.edit_by[key] + '</td></tr>';
     
        }   */
    } else {
        /*
        out += '<tr>';
        out += '<td>Url</td><td><input type="url" name="public[' + i + '][url]" /></td><tr><td>Description</td><td><textarea type="text" name="public[' + i + '][description]"></textarea></td><tr><td>Type</td><td><input type="text" name="public[' + i + '][type]"/></td>';
        out += '</tr>';
        i++;

        */

         

        // out += '</tr>';

        i++;



    }

    out += '<tr>';
    out+= '<td><select id="'+i+'dce" onchange="Add_TextArea(0,'+i+')" ></select> <button id="changepageDce'+i+'" >+</button></td>';
        
    jQuery("#data").append(out);
//onclick="clickDCEButton('+i+')"

    jQuery("#changepageDce"+i).click({i:i},clickDCEButton);
    jQuery("#data").append('</form>'); 
  
    //clickDCEButton(i);

    jQuery("#changepageDce"+i).trigger("click");

   //  getLovListProperties("dce",pageDce);
}

function DP_sendValue() {


//alert(jQuery("#datapaperForm").serializeObject());
console.log('Serialize ' , jQuery("#datapaperForm").serialize());


    var data = {
        action: 'send_info',
        value:  jQuery("#datapaperForm").serializeObject()
        

        //JSON.stringify(jQuery("#datapaperForm").serializeObject())
       // JSON.stringify(jQuery("#datapaperForm").serializeArray())
    };
     
    jQuery.ajax({
        url: "admin-ajax.php",
        type: 'post',
        data: data,
        dataType: 'json'
    }).done(function(data) {
        var data2;
        if (data.hasOwnProperty('rev')) {
            jQuery('#_rev').val(data.rev);
            jQuery('input [name="_rev"]').val(data.rev);
            data2 = {succes: true, msg: ['Update!!']};

        } else if (data.hasOwnProperty('error')) {
            data2 = {succes: true, msg: ['Sorry but cant update the value!!']};
        }
        modal_status(data2);
        DP_cancel();

        // console.log(data);

        notGenerated = true;

    });
}
/*
 function DP_DeleteValue() {
 
 var data = {
 action: 'delete_info',
 value: jQuery("#datapaperForm").serializeObject()
 };
 console.log(jQuery("#datapaperForm").serializeObject());
 jQuery.ajax({
 url: "admin-ajax.php",
 type: 'post',
 data: data,
 dataType: 'json'
 }).done(function(data) {
 modal_status(data);
 console.log(data);
 DP_cancel();
 });
 }
 */

function DP_cancel() {
    jQuery("#datapaper_info").html("");
    jQuery('#datapaper_command').hide();
    jQuery('#datapaper_search').show();
}

function Add_TextArea(i,idDce) {

    if (notGenerated){
         var selectBox = document.getElementById(idDce+"dce");

    var value = selectBox.options[selectBox.selectedIndex].value;
    //alert('valeur : '+value);

    out ='</tr>';
    out += '<td><input type="text" name="public[' + i + ']['+ value +']" value=""></td>';

       out += '</tr>';

    jQuery("#data").append(out);
    jQuery("#data").append('</form>');
    }
   
notGenerated = false;
    
}



//Fiona's code

function getLovListProperties(type,page,IdDce){
        var jsonData = "";
        //Envoyer requete ajax
        jQuery.ajax({
          type: "GET",
          url: "http://lov.okfn.org/dataset/lov/api/v2/autocomplete/terms",
          data: { q: type, page: page },
          async: false,  
        //  cache : false,
          dataType: "json"
        }).done(function(json){
            var dropdown="";
            jsonData = json.results;
                 jQuery.each(json.results, function(i,item) {
                    //dropdown = dropdown + "<option value='"+item.prefixedName+"'>"+item.prefixedName+"</option>"
                var property = item.prefixedName.replace(':','_');
 

    dropdown = dropdown + "<option value='"+property+"'>"+item.localName+"</option>"

                });
                  jQuery("#"+IdDce+type).append(dropdown); 
            });
        return jsonData;
      };


//Fonction appelée quand on clique sur le bouton + de DublinCore
function clickDCEButton (event) {

IdDce = event.data.i;
            pageDce = pageDce +1;
        // alert(IdDce)
            var results = getLovListProperties("dce",pageDce,IdDce);
            console.log(results);
            console.log(jQuery.isEmptyObject(results));
            
            if(jQuery.isEmptyObject(results)){
                jQuery("#changepageDce").fadeOut()
            }

          //  alert ('fin du traitement');


            return false;
        }

    
