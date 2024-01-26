import { SplashScreen } from '@capacitor/splash-screen';
import { SunmiCameraScanner } from '@kduma-autoid/capacitor-sunmi-camera-scanner';
import { WebViewWatchDog } from "@kduma-autoid/capacitor-webview-watchdog";

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();
      WebViewWatchDog.ping();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>@kduma-autoid/capacitor-sunmi-camera-scanner</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          <button class="button" id="scanQR">scanQR()</button>
          <button class="button" id="scanAny">scanAny()</button>
          <button class="button" id="scanMultiple">scanMultiple()</button>
          <button class="button" id="scanFlashlight">scanFlashlight()</button>
          <button class="button" id="scanInverse">scanInverse()</button>
          <button class="button" id="scanAlbum">scanAlbum()</button>
          <button class="button" id="scanSettings">scanSettings()</button>
          <button class="button" id="scanCycleMode">scanCycleMode?()</button>
        </p>
        <h2>Demo Events</h2>
        <p id="output"></p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot.querySelector('#scanQR').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
              symbologies: {
                qr_code: true,
              }
          });
          output.innerHTML = "<b>scanQR():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanQR() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });

      self.shadowRoot.querySelector('#scanAny').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
              symbologies: {
                ean_8: true,
                upc_e: true,
                isbn_10: true,
                code_11: true,
                upc_a: true,
                ean_13: true,
                isbn_13: true,
                interleaved_2_of_5: true,
                code_128: true,
                codabar: true,
                code_39: true,
                code_93: true,
                databar: true,
                databar_exp: true,
                micro_pdf417: true,
                microqr: true,
                qr_code: true,
                pdf417: true,
                data_matrix: true,
                aztec: true,
                hanxin: true,
              }
          });
          output.innerHTML = "<b>scanAny():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanAny() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });

      self.shadowRoot.querySelector('#scanMultiple').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
            recognize_multiple_codes: true,
            symbologies: {
              qr_code: true,
            }
          });
          output.innerHTML = "<b>scanMultiple():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanMultiple() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });

      self.shadowRoot.querySelector('#scanFlashlight').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
            show_flashlight: true,
            symbologies: {
              qr_code: true,
            }
          });
          output.innerHTML = "<b>scanFlashlight():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanFlashlight() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });

      self.shadowRoot.querySelector('#scanInverse').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
            recognize_inverse_codes: true,
            symbologies: {
              qr_code: true,
            }
          });
          output.innerHTML = "<b>scanInverse():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanInverse() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });

      self.shadowRoot.querySelector('#scanCycleMode').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
            scan_mode: true,
            symbologies: {
              qr_code: true,
            }
          });
          output.innerHTML = "<b>scanCycleMode():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanCycleMode() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });

      self.shadowRoot.querySelector('#scanAlbum').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
            show_album_selector: true,
            symbologies: {
              qr_code: true,
            }
          });
          output.innerHTML = "<b>scanAlbum():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanAlbum() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });

      self.shadowRoot.querySelector('#scanSettings').addEventListener('click', async function (e) {
        const output = self.shadowRoot.querySelector('#output');
        try {
          const data = await SunmiCameraScanner.scan({
            show_setting: true,
            symbologies: {
              qr_code: true,
            }
          });
          output.innerHTML = "<b>scanSettings():</b><br><pre><code>" + JSON.stringify(data, null, 3) + "</code></pre><hr>" + output.innerHTML;
        } catch (error) {
          output.innerHTML = "<b>scanSettings() - ERROR:</b><br><pre><code>" + JSON.stringify({ code: error.code, message: error.message }, null, 3) + "</code></pre><hr>" + output.innerHTML;
        }
      });
    }
  }
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  }
);
