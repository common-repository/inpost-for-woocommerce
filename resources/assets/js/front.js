var inpostjsGeowidgetModal;

function inpost_pl_get_shipping_method_js_mode() {
    let data = {};
    let method = jQuery('input[name^="shipping_method"]:checked').val();
    let postfix = '';
    if('undefined' == typeof method || null === method ) {
        method = jQuery('input[name^="shipping_method"]').val();
    }
    if(typeof method != 'undefined' && method !== null) {
        if (method.indexOf(':') > -1) {
            let arr = method.split(':');
            method = arr[0];
            postfix = arr[1];
        }
    }
    data.method = method;
    data.postfix = postfix;

    return data;
}

function inpost_pl_select_point_callback_js_mode(point) {
    
    let selected_point_data = '';
    let parcelMachineAddressDesc = '';
    let address_line1 = '';
    let address_line2 = '';


    if( typeof point.location_description != 'undefined' && point.location_description !== null ) {
        parcelMachineAddressDesc = point.location_description;
    }
    if( typeof point.address.line1 != 'undefined' && point.address.line1 !== null ) {
        address_line1 = point.address.line1;
    }
    if( typeof point.address.line2 != 'undefined' && point.address.line2 !== null ) {
        address_line2 = point.address.line2;
    }

    if( point.location_description ) {

        selected_point_data = '<div class="easypack_selected_point_data" id="easypack_selected_point_data" style="margin-bottom:15px">\n'
            + '<div id="selected-parcel-machine-id">' + point.name + '</div>\n'
            + '<span id="selected-parcel-machine-desc">' + address_line1 + '<br>' + address_line2 + '</span><br>'
            + '<span id="selected-parcel-machine-desc1">' + '(' + point.location_description + ')</span>' +
            '<input type="hidden" id="parcel_machine_id"\n' +
            'name="parcel_machine_id" class="parcel_machine_id" value="'+point.name+'"/>\n' +
            '<input type="hidden" id="parcel_machine_desc"\n' +
            'name="parcel_machine_desc" class="parcel_machine_desc" value="'+parcelMachineAddressDesc+'"/></div>\n';


    } else {
        selected_point_data = '<div class="easypack_selected_point_data" id="easypack_selected_point_data" style="margin-bottom:15px">\n'
            + '<div id="selected-parcel-machine-id">' + point.name + '</div>\n'
            + '<span id="selected-parcel-machine-desc">' + point.address.line1 + '<br>' + address_line2 + '</span><br>'
            '<input type="hidden" id="parcel_machine_id"\n' +
            'name="parcel_machine_id" class="parcel_machine_id" value="'+point.name+'"/>\n' +
            '<input type="hidden" id="parcel_machine_desc"\n' +
            'name="parcel_machine_desc" class="parcel_machine_desc" value="'+parcelMachineAddressDesc+'"/></div>';
    }

    jQuery('#easypack_selected_point_data').remove();
    jQuery('#easypack_js_type_geowidget').after(selected_point_data);
    jQuery("#easypack_js_type_geowidget").text(easypack_front_map.button_text2);

    let point_address = address_line1 + '<br>' + address_line2;    

    inpostjsGeowidgetModal.close();
}


jQuery(document).ready(function() {

    // Prepare modal with map
    let token = easypack_front_map.geowidget_v5_token;
    let shipping_data = inpost_pl_get_shipping_method_js_mode();
    let method = shipping_data.method;
    let config = 'parcelCollect';

    if(typeof method != 'undefined' && method !== null) {
        if (method === 'easypack_parcel_machines_cod') {
            config = 'parcelCollectPayment';
        }
        if (method === 'easypack_shipping_courier_c2c') {
            config = 'parcelSend';
        }
        if (method === 'easypack_parcel_machines_weekend') {
            config = 'parcelCollect247';
        }
    }

    var wH = jQuery(window).height()-80;

    inpostjsGeowidgetModal = new jBox('Modal', {
        width: 800,
        height: wH,
        attach: '#easypack_show_geowidget_modal',
        title: 'Wybierz paczkomat',
        content: '<inpost-geowidget id="inpost-geowidget" onpoint="inpost_pl_select_point_callback_js_mode" token="'+token+'" language="pl" config="'+config+'"></inpost-geowidget>'
    });

    jQuery( document.body ).on('update_checkout', function() {
        jQuery('.easypack_show_geowidget').each(function(ind, elem) {
            jQuery(elem).remove();
        });
        jQuery('.easypack_selected_point_data').each(function(ind, elem) {
            jQuery(elem).remove();
        });

    });

    jQuery( document.body ).on('updated_checkout', function() {

        let shipping_data = inpost_pl_get_shipping_method_js_mode();
        let method = shipping_data.method;
        let postfix = shipping_data.postfix;

        jQuery('.easypack_show_geowidget').each(function(ind, elem) {
            jQuery(elem).remove();
        });
        jQuery('.easypack_selected_point_data').each(function(ind, elem) {
            jQuery(elem).remove();
        });
        //empty hidden values of selected point
        jQuery('input[name=parcel_machine_id]').each(function(ind, elem) {
            jQuery(elem).val('');
        });
        jQuery('input[name=parcel_machine_desc]').each(function(ind, elem) {
            jQuery(elem).val('');
        });
        jQuery('#ship-to-different-address').show();

        if( typeof method != 'undefined' && method !== null ) {
			let config = 'parcelCollect';
            if (method === 'easypack_parcel_machines_cod') {
                config = 'parcelCollectPayment';
            }
            if (method === 'easypack_shipping_courier_c2c') {
                config = 'parcelSend';
            }
            if (method === 'easypack_parcel_machines_weekend') {
                config = 'parcelCollect247';
            }

            let wH = jQuery(window).height()-80;
			
			let map_content = '<inpost-geowidget id="inpost-geowidget" onpoint="inpost_pl_select_point_callback_js_mode" token="'+token+'" language="pl" config="'+config+'"></inpost-geowidget>';
			inpostjsGeowidgetModal.setContent( map_content );            

            let selector = '#shipping_method_0_' + method + postfix;

            let map_button = '<div class="easypack_show_geowidget" id="easypack_js_type_geowidget">\n' +
                easypack_front_map.button_text1 + '</div>';

            let li = jQuery(selector).parent('li');

            if ( method.indexOf('easypack_parcel_machines') !== -1 ) {
                jQuery(li).after(map_button);
                jQuery('#ship-to-different-address').hide();
            }

            // open modal with map
            document.addEventListener('click', function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;

                if (target.hasAttribute('id') && target.getAttribute('id') === 'easypack_js_type_geowidget') {
                    e.preventDefault();
                    if( typeof inpostjsGeowidgetModal != 'undefined' && inpostjsGeowidgetModal !== null ) {
                        if( ! inpostjsGeowidgetModal.isOpen ) {
                            inpostjsGeowidgetModal.open();
                        }
                    }
                }
            });
        }
    });
});
