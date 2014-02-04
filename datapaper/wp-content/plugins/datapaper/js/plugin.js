var i = 0;
var id;
var  notGenerated = true;

var pageDce = 0;

jQuery(document).ready(
        function() {

         
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
    var out = '<form id="datapaperForm"><div id="divform"><table class="table"><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody id="data">';
    out += '</tbody></table></div><div id="divdce"><div id="divdceinput"></div></div>';
    jQuery("#datapaper_info").append(out);
    out = '<tr><div id="basic"><td>URI</td><td id="_id">' + id + '<input  type="hidden" name="_id" value="' + id + '" /></td></tr>';
   
    if (value !== null) {
        out += '<tr type="hidden" style="display:none"><td>Revision</td><td id="_rev">' + value._rev + '<input type="hidden" name="_rev" value="' + value._rev + '" /></td></tr></div>';
    }
    jQuery("#data").append(out);

    DP_addMoreInfo(value, editable);
}

/*
function DP_addTable(value, editable) {

    DP_cancel();
    jQuery('#datapaper_search').hide();
    jQuery('#datapaper_command').show();
    var out = '<form id="datapaperForm">';
   
    out+='<div id="data">';
     jQuery("#datapaper_info").append(out);

 //   out = '<div id="basic">URI< id="_id">' + id + '<input type="hidden" name="_id" value="' + id + '" /></p>';
   out +='<div><label for="_id" class="required">ID</label><h  id="_id" name="_id" value="' + id + '"  class="form-control">' + id + '</h></div>';
    if (value !== null) {
        out += '<div type="hidden" style="display:none"><p id="_rev">' + value._rev + '<input type="hidden" name="_rev" value="' + value._rev + '" /></p></div>';
    }
    jQuery("#datapaper_info #datapaperForm #data").append(out);

    DP_addMoreInfo(value, editable);
}
*/
function DP_addMoreInfo(value, editable) {

    /*

    Pour afficher un TextArea a chaque fois qu'on clique sur une option
    Reativer l'affichage car avant on la désactivé au cas ou le user
    Veut modifier la valeur de l'Option sans avoir a généré un autre TextArea
    */
    notGenerated = true;

pageDce = 0;
    var out = '';
    if (value !== null) {
        // alert(value.public.length);
        for (var j = 0; j < value.public.length; j++) {

            for (key in value.public[j]) {


              // la modifiée 
              sub = key.substring(key.indexOf('_')+1, key.length);
              
               out += '<tr><td>' + sub + '</td><td>';
              //out = '<div><label for="_id" class="required">' + key + '</label>';
                if (editable) {
                    /*
                    if (key == 'description') {
                        out += '<textarea class="erasable" name="public[' + j + '][' + key + ']" >' + value.public[j][key] + '</textarea>';

                    } else if (key == 'type') {
                        out += '<input class="special erasable" data-toggle="popover" data-placement="right" data-original-title="Examples" data-content="html, pdf, user-photo, user-twitter, user-web, user-phone" type="text" name="public[' + j + '][' + key + ']" value="' + value.public[j][key] + '"/>';

                    } else {

                        */
                  // la modifié 
                       out += '<input class="form-control"   type="text" name="public[' + j + '][' + key + ']" value="' + value.public[j][key] + '"/>';
                  //      out += '<input class="form-control"  type="text" name="public[' + j + '][' + key + ']" value="' + value.public[j][key] + '"/>';

                 //   }
                }

                 else {
                    out += value.public[j][key];
                }
              // la modifiée
                out += ' </td></tr>';
              //  out += ' </div>';
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

  // la modifiée 
   //out += '<div id=divdce></div>';
   //jQuery("#data").append(out);
   // modifiée 
   
   out2 = '<select id="'+i+'dce"  ></select> <button class="btn btn-success button-form-control" id="changepageDce'+i+'" >+</button>';
     
   //  out+= '<div><select id="'+i+'dce"  ></select> <button id="changepageDce'+i+'" >+</button></div>';  
    jQuery("#data").append(out);
        jQuery("#divdce").append(out2);

//onclick="clickDCEButton('+i+')"
//onchange="Add_TextArea(0,'+i+')"


    jQuery("#changepageDce"+i).click({i:i},clickDCEButton);
    jQuery("#"+i+"dce").change({i:i},Add_TextArea);
    jQuery("#data").append('</form>'); 
  
    //clickDCEButton(i);

    jQuery("#changepageDce"+i).trigger("click");

   //  getLovListProperties("dce",pageDce);
}

function DP_sendValue() {


//alert(jQuery("#datapaperForm").serializeObject());
console.log('Serialize ' , jQuery("#datapaperForm").serializeObject());


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

function Add_TextArea(event) {
   //  alert("appel");

     
     idDce = event.data.i;

  //   alert(idDce);
    if (notGenerated){
         var selectBox = document.getElementById(idDce+"dce");

    var value = selectBox.options[selectBox.selectedIndex].value;
    //alert('valeur : '+value);

   // out ='<div>';
    out2 = '<input class=form-control id="input'+i+'" type="text" name="public[' + 0 + ']['+ value +']" value="">';

//       out += '</div>';

//alert('#data #'+i+'divdce');
    jQuery('#divdce').append(out2);
    jQuery("#data").append('</form>');
    }
    else{

    var selectBox = document.getElementById(idDce+"dce");

    var value = selectBox.options[selectBox.selectedIndex].value;


    jQuery("#input"+i).attr("name","public[0]["+ value +"]");
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

    
