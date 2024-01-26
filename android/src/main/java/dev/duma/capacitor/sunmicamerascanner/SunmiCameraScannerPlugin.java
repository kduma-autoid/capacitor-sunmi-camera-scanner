package dev.duma.capacitor.sunmicamerascanner;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.os.Bundle;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

@CapacitorPlugin(name = "SunmiCameraScanner")
public class SunmiCameraScannerPlugin extends Plugin {
    @ActivityCallback
    private void pickScanResultResult(PluginCall call, ActivityResult result) {
        if (call == null) {
            return;
        }


        Intent data = result.getData();
        if(data == null) {
            return;
        }


        JSArray scans = new JSArray();

        Bundle bundle = data.getExtras();
        assert bundle != null;
        var scan_results = (ArrayList<HashMap<String, String>>) bundle.getSerializable("data");
        assert scan_results != null;
        for (HashMap<String, String> hashMap : scan_results) {
            JSObject scan = new JSObject();
            scan.put("type", hashMap.get("TYPE"));
            scan.put("value", hashMap.get("VALUE"));
            scans.put(scan);
        }

        JSObject ret = new JSObject();
        ret.put("scans", scans);
        call.resolve(ret);
    }

    @PluginMethod
    public void scan(PluginCall call) throws JSONException {
        try {
            Intent intent = new Intent("com.sunmi.scanner.qrscanner");

            intent.putExtra("PLAY_SOUND", call.getBoolean("play_sound", true));
            intent.putExtra("PLAY_VIBRATE", call.getBoolean("play_vibrate", false));

            intent.putExtra("IS_SHOW_SETTING", call.getBoolean("show_setting", false));
            intent.putExtra("IS_SHOW_ALBUM", call.getBoolean("show_album_selector", false));
            intent.putExtra("IS_OPEN_LIGHT", call.getBoolean("show_flashlight", false));

            intent.putExtra("IDENTIFY_MORE_CODE", call.getBoolean("recognize_multiple_codes", false));
            intent.putExtra("IDENTIFY_INVERSE", call.getBoolean("recognize_inverse_codes", false));

            intent.putExtra("SCAN_MODE", call.getBoolean("scan_mode", false));

            JSObject symbologies = call.getObject("symbologies", new JSObject());
            assert symbologies != null;

            intent.putExtra("IS_EAN_8_ENABLE", symbologies.getBoolean("ean_8", false));
            intent.putExtra("IS_UPC_E_ENABLE", symbologies.getBoolean("upc_e", false));
            intent.putExtra("IS_ISBN_10_ENABLE", symbologies.getBoolean("isbn_10", false));
            intent.putExtra("IS_CODE_11_ENABLE", symbologies.getBoolean("code_11", false));
            intent.putExtra("IS_UPC_A_ENABLE", symbologies.getBoolean("upc_a", false));
            intent.putExtra("IS_EAN_13_ENABLE", symbologies.getBoolean("ean_13", false));
            intent.putExtra("IS_ISBN_13_ENABLE", symbologies.getBoolean("isbn_13", false));
            intent.putExtra("IS_INTERLEAVED_2_OF_5_ENABLE", symbologies.getBoolean("interleaved_2_of_5", false));
            intent.putExtra("IS_CODE_128_ENABLE", symbologies.getBoolean("code_128", false));
            intent.putExtra("IS_CODABAR_ENABLE", symbologies.getBoolean("codabar", false));
            intent.putExtra("IS_CODE_39_ENABLE", symbologies.getBoolean("code_39", false));
            intent.putExtra("IS_CODE_93_ENABLE", symbologies.getBoolean("code_93", false));
            intent.putExtra("IS_DATABAR_ENABLE", symbologies.getBoolean("databar", false));
            intent.putExtra("IS_DATABAR_EXP_ENABLE", symbologies.getBoolean("databar_exp", false));
            intent.putExtra("IS_Micro_PDF417_ENABLE", symbologies.getBoolean("micro_pdf417", false));
            intent.putExtra("IS_MicroQR_ENABLE", symbologies.getBoolean("microqr", false));
            intent.putExtra("IS_QR_CODE_ENABLE", symbologies.getBoolean("qr_code", false));
            intent.putExtra("IS_PDF417_ENABLE", symbologies.getBoolean("pdf417", false));
            intent.putExtra("IS_DATA_MATRIX_ENABLE", symbologies.getBoolean("data_matrix", false));
            intent.putExtra("IS_AZTEC_ENABLE", symbologies.getBoolean("aztec", false));
            intent.putExtra("IS_Hanxin_ENABLE", symbologies.getBoolean("hanxin", false));

            try {
                startActivityForResult(call, intent, "pickScanResultResult");
            } catch (ActivityNotFoundException e) {
                intent.setAction("com.summi.scan");
                startActivityForResult(call, intent, "pickScanResultResult");
            }
        } catch (RuntimeException e) {
            call.reject(e.getMessage(), e);
        }
    }
}
