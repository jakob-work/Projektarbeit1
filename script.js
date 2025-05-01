import { generatePDF } from './pdfPrint.js';
window.generatePDF = generatePDF;

document.addEventListener("DOMContentLoaded", function () {
    // Logo Setup
    const logoContainer = document.createElement("div");
    logoContainer.className = "logo-container";

    const logoImg = document.createElement("img");
    logoImg.src = "images/GOEPELelectronic_logo.png";
    logoImg.alt = "Goepel Logo";
    logoImg.className = "logo";

    logoContainer.appendChild(logoImg);

    const heading = document.querySelector("h1");
    if (heading) {
        heading.parentNode.insertBefore(logoContainer, heading);
    }

    let inputOutputCount = document.querySelectorAll('.dynamic-input-output').length;
    const dynamicInputsContainer = document.getElementById('dynamicInputsContainer');
    const addInputOutputButton = document.getElementById('addInputOutput');

    // Add Input/Output Section
    function addInputOutput() {
        inputOutputCount++;
        const newInputOutput = document.createElement('div');
        newInputOutput.classList.add('form-group', 'dynamic-input-output', 'video-parameter');
        newInputOutput.setAttribute('data-index', inputOutputCount);
        newInputOutput.innerHTML = `
            <h2>UUT Video IN/OUT ${inputOutputCount}</h2>
            <!--Hardware Information-->
                <div class="form-group">
                    <div class="btn-group two-buttons" data-toggle="inputOrOutput-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="inputOrOutput[]" value="Input"> Input
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="inputOrOutput[]" value="Output"> Output
                        </label>
                    </div>
                </div>
                	
                <div class="form-group">
                    <label>Signal Direction:</label>
                    <div class="signal-direction-container">
                        <select name="icType[]" class="icType" required>
                            <option value="">Select</option>
                            <option value="Source">Source</option>
                            <option value="Sink">Sink IC</option>
                        </select>
                        <span class="icType-placeholder" style="display: none; margin-left: 10px;"></span>
                    </div>
                        <div class="additional-source-fields" style="display: none;"></div>
                    </div>
                    <div class="form-group video-connector-type" style="display: none;">
                    <label>Video connector type:</label>
                    <div class="buttons">
                        <button type="button" class="btn option" data-value="STP">STP</button>
                        <button type="button" class="btn option" data-value="Coax">Coax</button>
                        <button type="button" class="btn option" data-value="HMTD">HMTD</button>
                        <button type="button" class="btn option" data-value="Other">Other</button>
                    </div>
                    <div class="video-connector-images" style="margin-top: 10px;">
                        <img src="images/STP.png" alt="STP" class="video-connector-image">
                        <img src="images/Coax.png" alt="Coax" class="video-connector-image">
                        <img src="images/Hmtd.png" alt="HMTD" class="video-connector-image">
                        <textarea name="otherVideoConnectorType" placeholder="Please specify" style="margin-top: 10px;"></textarea>
                    </div>
                </div>
                <div class="form-group video-connector-pinning" style="display: none;">
                    <label for="pinningConnector">Pinning of video connector:</label>
                    <textarea id="pinningConnector" name="pinningConnector" rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Power supply of UUT via video cable?</label>
                    <div class="power-supply-wrapper">
                        <div class="power-supply-buttons">
                            <span class="btn-option" data-value="Yes">Yes</span>
                            <span class="btn-option" data-value="No">No</span>
                        </div>
                        <div class="form-group power-supply-details" style="display: none;">
                            <input type="text" name="voltageCurrentConsumption[]" 
                            placeholder="Consumption: e.g: 12V / 500mA">
                        </div>
                    </div>
                    <!--Video Parameters-->
                <br> 
                <div class="form-group">
                    <label>Pixel Clock:</label>
                    <input type="text" name="pixelClock[]" required>
                </div>
                <div class="form-group">
                    <label>Image Width:</label>
                    <input type="number" name="imageWidth[]" required>
                </div>
                <div class="form-group">
                    <label>Image Height:</label>
                    <input type="number" name="imageHeight[]" required>
                </div>
                <div class="form-group">
                    <label>Frame Rate:</label>
                    <input type="number" name="frameRate[]" required>
                </div>
                <div class="form-group">
                    <label>Horizontal Sync Polarity:</label>
                    <div class="btn-group" data-toggle="horizontal-sync-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="horizontalSyncPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="horizontalSyncPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Vertical Sync Polarity:</label>
                    <div class="btn-group" data-toggle="vertical-sync-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="verticalSyncPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="verticalSyncPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Data Enable Polarity:</label>
                    <div class="btn-group" data-toggle="data-enable-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="dataEnablePolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="dataEnablePolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Pixel Clock Polarity:</label>
                    <div class="btn-group" data-toggle="pixel-clock-polarity-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="pixelClockPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="pixelClockPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Lock Output Enable:</label>
                    <div class="btn-group" data-toggle="lock-output-enable-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="lockOutputEnable[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="lockOutputEnable[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Lock Polarity:</label>
                    <div class="btn-group" data-toggle="lock-polarity-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="lockPolarity[]" value="High"> High
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="lockPolarity[]" value="Low"> Low
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Video Format:</label>
                    <input type="text" name="videoFormat[]" required>
                </div>
            </div>

                <div class="form-group">
                    <label for="numberVideo">Number of Video Channels per Stream:</label>
                    <div class="slider-wrapper">
                        <input type="number" id="numberVideoChannelsEditable" name="numberVideoChannelsEditable" min="1" max="10" value="1" required style="width: 60px; margin-right: 10px;">
                        <input type="range" id="numberVideoChannels" name="numberVideoChannels" min="1" max="10" value="1" data-value="1" required>
                        <span class="slider-display" id="numberVideoChannelsDisplay">1</span>
                    </div>
                </div>
                <div class="form-group">
                    <label>Is HDCP used?
                        <span class="info-tooltip-wrapper">
                            <span class="info-icon"><span class="info-text">i</span></span>
                            <span class="tooltip textbox second-tooltip">
                                HDCP (High-bandwidth Digital Content Protection) is used to prevent unauthorized copying of 
                                digital content.
                            </span>
                        </span>
                    </label>
                    <div class="btn-group two-buttons" data-toggle="hdcp-buttons">
                        <label class="btn btn-option">
                            <input type="radio" name="hdcpUsed[]" value="Yes"> Yes
                        </label>
                        <label class="btn btn-option">
                            <input type="radio" name="hdcpUsed[]" value="No"> No
                        </label>
                    </div>
                </div>

                <!--Sideband Communication-->
                <div class="form-group">
                    <label>Sideband Communication:          
                        <span class="info-tooltip-wrapper">
                            <span class="info-icon"><span class="info-text">i</span></span>
                            <span class="tooltip textbox second-tooltip">
                                Sideband Communication describes Additional communication channels that can be used alongside the main video signal.
                                <ul>
                                    <li><strong>I2C:</strong> Configure camera modules (e.g. resolution, frame rate) over a simple 2-wire connection.</li>
                                    <li><strong>UART:</strong> Logging or debugging messages from video devices during development.</li>
                                    <li><strong>SPI:</strong> High-speed interface for transferring control data or syncing between chips in the video path.</li>
                                    <li><strong>MII:</strong> Transmits Ethernet-based data, sometimes used for camera-to-ECU communication or synchronization.</li>
                                    <li><strong>CAN:</strong> Common in vehicles to send control signals (e.g. ignition state) or receive system status messages.</li>
                                </ul>
                            </span>
                        </span>
                    </label>
                    <div class="sideband-group">
                        <label class="sideband-option">
                            <input type="checkbox" name="sideband" value="I2C"> I2C
                        </label>
                        <label class="sideband-option">
                            <input type="checkbox" name="sideband" value="UART"> UART
                        </label>
                        <label class="sideband-option">
                            <input type="checkbox" name="sideband" value="SPI"> SPI
                        </label>
                        <label class="sideband-option">
                            <input type="checkbox" name="sideband" value="MII"> MII
                        </label>
                        <label class="sideband-option">
                            <input type="checkbox" name="sideband" value="CAN"> CAN
                        </label>
                    </div>
                </div>

                <!--Chip dependent Information-->
                <div class="form-group">
                    <h3>Chip Manufacturer:</h3>
                    <select name="chipManufacturer[]" class="chipManufacturer" required>
                        <option value="">Select</option>
                        <option value="Texas Instruments">Texas Instruments</option>
                        <option value="APIX">APIX</option>
                        <option value="Maxim">Maxim</option>
                    </select>
                    
                    <hr>

                    <div class="chip-options fpd-options">
                        <!-- Texas Instruments specific options -->
                        <div class="form-group">
                            <label>FPD Link:</label>
                            <div class="buttons">
                                <button type="button" class="btn option" data-value="FPD Link II">FPD Link II</button>
                                <button type="button" class="btn option" data-value="FPD Link III">FPD Link III</button>
                                <button type="button" class="btn option" data-value="FPD Link IV">FPD Link IV</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Backward compatible mode:</label>
                            <div class="buttons">
                                <button type="button" class="btn option" data-value="Yes">Yes</button>
                                <button type="button" class="btn option" data-value="No">No</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Low frequency mode:</label>
                            <div class="buttons">
                                <button type="button" class="btn option" data-value="Yes">Yes</button>
                                <button type="button" class="btn option" data-value="No">No</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>FPD Link III Transfer Mode:</label>
                            <div class="buttons">
                                <button type="button" class="btn option" data-value="Single Lane">Single Lane</button>
                                <button type="button" class="btn option" data-value="Dual Lane">Dual Lane</button>
                            </div>
                        </div>
                        <div class="form-group textBox">
                            <label>Additional Information:</label>
                            <label for="useCase"></label>
                            <textarea id="useCase" name="useCase" rows="5" required></textarea>
                        </div>
                    </div>
                    <div class="chip-options apix-options">
                        <!-- APIX specific options -->
                        <div class="form-group">
                            <label>APIX Mode:</label>
                            <div class="buttons">
                                <button type="button" class="btn option" data-value="APIX I">APIX I</button>
                                <button type="button" class="btn option" data-value="APIX II">APIX II</button>
                                <button type="button" class="btn option" data-value="APIX III">APIX III</button>
                            </div>
                        </div>
                        <div class="form-group textBox">
                            <label>Additional Information:</label>
                            <label for="useCase"></label>
                            <textarea id="useCase" name="useCase" rows="5" required></textarea>
                        </div>
                    </div>
                    <div class="chip-options gmsl-options">
                        <!-- Maxim specific options -->
                        <div class="form-group">
                            <label>GMSL Version:</label>
                            <div class="buttons">
                                <button type="button" class="btn option" data-value="GMSL I">GMSL I</button>
                                <button type="button" class="btn option" data-value="GMSL II">GMSL II</button>
                                <button type="button" class="btn option" data-value="GMSL III">GMSL III</button>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Bus Width:</label>
                            <div class="buttons">
                                <button type="button" class="btn option" data-value="24 bit">24 bit</button>
                                <button type="button" class="btn option" data-value="32 bit">32 bit</button>
                                <button type="button" class="btn option" data-value="64 bit">64 bit</button>
                            </div>
                        </div>
                        <div class="form-group textBox">
                            <label>Additional Information:</label>
                            <label for="useCase"></label>
                            <textarea id="useCase" name="useCase" rows="5" required></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <button type="button" class="remove-video-parameter" data-index="${inputOutputCount}">Remove UUT Video IN/OUT ${inputOutputCount}</button>
        `;
        dynamicInputsContainer.appendChild(newInputOutput);
        dynamicInputsContainer.appendChild(addInputOutputButton);
        applyEventListeners(newInputOutput);
        newInputOutput.querySelectorAll('.slider-wrapper').forEach(wrapper => {
            attachSliderSync(wrapper);
        });
    }

    // Apply Event Listeners
    function applyEventListeners(section) {
        console.log("Applying event listeners to a new section");

        // IC Type Selection
        const icTypeSelect = section.querySelector('select[name="icType[]"]');
        if (icTypeSelect) {
            icTypeSelect.addEventListener('change', function () {
                const placeholder = section.querySelector('.signal-direction-container .icType-placeholder');
                const videoConnectorSection = section.querySelector('.video-connector-type');
                const powerSupplyGroup = section.querySelector('.power-supply-wrapper');
                const powerSupplyContainer = powerSupplyGroup?.closest('.form-group'); // Ensure the entire container is hidden
                const pinningField = section.querySelector('.video-connector-pinning');
                const additionalSourceFields = section.querySelector('.additional-source-fields');
                const chipOptions = section.querySelectorAll('.chip-options');
                const pixelClockToVideoFormat = section.querySelectorAll(
                    '[name="pixelClock[]"], [name="imageWidth[]"], [name="imageHeight[]"], [name="frameRate[]"], [data-toggle="horizontal-sync-buttons"], [data-toggle="vertical-sync-buttons"], [data-toggle="data-enable-buttons"], [data-toggle="pixel-clock-polarity-buttons"], [data-toggle="lock-output-enable-buttons"], [data-toggle="lock-polarity-buttons"]'
                );

                if (this.value === 'Source') {
                    placeholder.textContent = 'Serializer';
                    placeholder.style.display = 'flex';
                    if (videoConnectorSection) videoConnectorSection.style.display = "block";
                    if (powerSupplyGroup) powerSupplyGroup.style.display = "flex";
                    if (powerSupplyContainer) powerSupplyContainer.style.display = "block";
                    if (pinningField) pinningField.style.display = "block";
                    if (additionalSourceFields) additionalSourceFields.style.display = "block";
                    chipOptions.forEach(option => option.style.display = "none");
                    pixelClockToVideoFormat.forEach(el => el.closest('.form-group').style.display = "block");
                } else if (this.value === 'Sink') {
                    placeholder.textContent = 'Deserializer';
                    placeholder.style.display = 'flex';
                    if (videoConnectorSection) videoConnectorSection.style.display = "none";
                    if (powerSupplyGroup) powerSupplyGroup.style.display = "none";
                    if (powerSupplyContainer) powerSupplyContainer.style.display = "none";
                    if (pinningField) pinningField.style.display = "none";
                    if (additionalSourceFields) additionalSourceFields.style.display = "none";
                    chipOptions.forEach(option => option.style.display = "none");
                    pixelClockToVideoFormat.forEach(el => el.closest('.form-group').style.display = "none");
                } else {
                    placeholder.textContent = '';
                    placeholder.style.display = 'none';
                    if (videoConnectorSection) videoConnectorSection.style.display = "none";
                    if (powerSupplyGroup) powerSupplyGroup.style.display = "none";
                    if (powerSupplyContainer) powerSupplyContainer.style.display = "none";
                    if (pinningField) pinningField.style.display = "none";
                    if (additionalSourceFields) additionalSourceFields.style.display = "none";
                    chipOptions.forEach(option => option.style.display = "none");
                    pixelClockToVideoFormat.forEach(el => el.closest('.form-group').style.display = "none");
                }
            });
            icTypeSelect.dispatchEvent(new Event('change'));
        } else {
            console.log("IC Type select not found!");
        }

        // Chip Manufacturer Selection
        const chipManufacturerSelect = section.querySelector('.chipManufacturer');
        if (chipManufacturerSelect) {
            chipManufacturerSelect.addEventListener('change', function () {
                const chipOptions = section.querySelectorAll('.chip-options');
                chipOptions.forEach(option => option.style.display = "none");

                if (this.value === "Texas Instruments") {
                    const fpdOptions = section.querySelector(".fpd-options");
                    if (fpdOptions) fpdOptions.style.display = "block";
                } else if (this.value === "APIX") {
                    const apixOptions = section.querySelector(".apix-options");
                    if (apixOptions) apixOptions.style.display = "block";
                } else if (this.value === "Maxim") {
                    const gmslOptions = section.querySelector(".gmsl-options");
                    if (gmslOptions) gmslOptions.style.display = "block";
                }
            });
            chipManufacturerSelect.dispatchEvent(new Event('change'));
        } else {
            console.log("Chip Manufacturer select not found!");
        }

        // Power Supply Toggle
        const powerButtons = section.querySelectorAll(".power-supply-buttons .btn-option");
        if (powerButtons.length > 0) {
            console.log("Power supply buttons found");
            powerButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Power supply button clicked");
                    const parent = button.closest(".power-supply-buttons");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");

                    const powerSupplyDetails = section.querySelector(".power-supply-details");
                    if (button.dataset.value === "Yes") {
                        powerSupplyDetails.style.display = "block";
                    } else {
                        powerSupplyDetails.style.display = "none";
                    }
                });
            });
        } else {
            console.log("Power supply buttons NOT found!");
        }

        // Video Connector Type Selection
        const videoConnectorButtons = section.querySelectorAll(".buttons .btn.option");
        if (videoConnectorButtons.length > 0) {
            console.log("Video connector buttons found");
            videoConnectorButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const parent = button.parentElement;
                    parent.querySelectorAll(".btn.option").forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    const imagesContainer = section.querySelector('.video-connector-images');
                    const otherTextbox = imagesContainer.querySelector('textarea[name="otherVideoConnectorType"]');
                    const value = button.dataset.value;
                    
                    if (value === "Other") {
                        imagesContainer.classList.add("hide-images");
                        if (otherTextbox) {
                            otherTextbox.classList.add("visible");
                        }
                    } else {
                        imagesContainer.classList.remove("hide-images");
                        if (otherTextbox) {
                            otherTextbox.classList.remove("visible");
                        }
                    }
                });
            });
        } else {
            console.log("Video connector buttons NOT found!");
        }

        // Sideband Communication Toggle
        const sidebandOptions = section.querySelectorAll(".sideband-option");
        if (sidebandOptions.length > 0) {
            console.log("Sideband communication options found");
            sidebandOptions.forEach(option => {
                option.addEventListener("click", function () {
                    console.log("Sideband option clicked");
                    const checkbox = option.querySelector('input');
                    checkbox.checked = !checkbox.checked;
                    option.classList.toggle('active', checkbox.checked);
                });
            });
        } else {
            console.log("Sideband communication options NOT found!");
        }

        // Horizontal Sync Polarity
        const horizontalSyncButtons = section.querySelectorAll("[data-toggle='horizontal-sync-buttons'] .btn-option");
        if (horizontalSyncButtons.length > 0) {
            console.log("Horizontal sync buttons found");
            horizontalSyncButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Horizontal sync button clicked");
                    const parent = button.closest("[data-toggle='horizontal-sync-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            });
        } else {
            console.log("Horizontal sync buttons NOT found!");
        }

        // Vertical Sync Polarity
        const verticalSyncButtons = section.querySelectorAll("[data-toggle='vertical-sync-buttons'] .btn-option");
        if (verticalSyncButtons.length > 0) {
            console.log("Vertical sync buttons found");
            verticalSyncButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Vertical sync button clicked");
                    const parent = button.closest("[data-toggle='vertical-sync-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            });
        } else {
            console.log("Vertical sync buttons NOT found!");
        }

        // Data Enable Polarity
        const dataEnableButtons = section.querySelectorAll("[data-toggle='data-enable-buttons'] .btn-option");
        if (dataEnableButtons.length > 0) {
            console.log("Data enable buttons found");
            dataEnableButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Data enable button clicked");
                    const parent = button.closest("[data-toggle='data-enable-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            });
        } else {
            console.log("Data enable buttons NOT found!");
        }

        // Desired Hardware Format
        const hardwareFormatButtons = section.querySelectorAll("[data-toggle='button'] .btn-option");
        if (hardwareFormatButtons.length > 0) {
            console.log("Hardware format buttons found");
            hardwareFormatButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Hardware format button clicked");
                    const parent = button.closest("[data-toggle='button']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add('active');
                });
            });
        } else {
            console.log("Hardware format buttons NOT found!");
        }

        // HDCP Toggle Fix
        const hdcpButtons = section.querySelectorAll("[data-toggle='hdcp-buttons'] .btn-option");
        if (hdcpButtons.length > 0) {
            console.log("HDCP buttons found");
            hdcpButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("HDCP button clicked");
                    const parent = button.closest("[data-toggle='hdcp-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                });
            });
        } else {
            console.log("HDCP buttons NOT found!");
        }

        // Pixel Clock Polarity Buttons
        const pixelClockPolarityButtons = section.querySelectorAll("[data-toggle='pixel-clock-polarity-buttons'] .btn-option");
        if (pixelClockPolarityButtons.length > 0) {
            console.log("Pixel Clock Polarity buttons found");
            pixelClockPolarityButtons.forEach(button => {
                button.addEventListener('click', function () {
                    pixelClockPolarityButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    let radio = button.querySelector("input[type='radio']");
                    if (radio) {
                        radio.checked = true;
                    }
                });
            });
        } else {
            console.log("Pixel Clock Polarity buttons NOT found!");
        }

        // Lock Output Enable Buttons
        const lockOutputEnableButtons = section.querySelectorAll("[data-toggle='lock-output-enable-buttons'] .btn-option");
        if (lockOutputEnableButtons.length > 0) {
            console.log("Lock Output Enable buttons found");
            lockOutputEnableButtons.forEach(button => {
                button.addEventListener("click", function (e) {
                    e.preventDefault();
                    const parent = button.closest("[data-toggle='lock-output-enable-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                    let radio = button.querySelector("input[type='radio']");
                    if (radio) {
                        radio.checked = true;
                    }
                });
            });
        } else {
            console.log("Lock Output Enable buttons NOT found!");
        }

        // Lock Polarity Buttons
        const lockPolarityButtons = section.querySelectorAll("[data-toggle='lock-polarity-buttons'] .btn-option");
        if (lockPolarityButtons.length > 0) {
            console.log("Lock Polarity buttons found");
            lockPolarityButtons.forEach(button => {
                button.addEventListener("click", function (e) {
                    e.preventDefault();
                    const parent = button.closest("[data-toggle='lock-polarity-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");
                    let radio = button.querySelector("input[type='radio']");
                    if (radio) {
                        radio.checked = true;
                    }
                });
            });
        } else {
            console.log("Lock Polarity buttons NOT found!");
        }

        // Input/Output Toggle
        const inputOutputButtons = section.querySelectorAll("[data-toggle='inputOrOutput-buttons'] .btn-option");
        if (inputOutputButtons.length > 0) {
            console.log("Input/Output buttons found");
            inputOutputButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Input/Output button clicked");
                    const parent = button.closest("[data-toggle='inputOrOutput-buttons']");
                    parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove("active"));
                    button.classList.add("active");

                    const radio = button.querySelector("input[type='radio']");
                    if (radio) {
                        radio.checked = true;
                    }
                });
            });
        } else {
            console.log("Input/Output buttons NOT found!");
        }
    }

    // Update Chip Options
    function updateChipOptions(selectElement) {
        const chipManufacturer = selectElement.value;
        const parameterContainer = selectElement.closest(".video-parameter");

        parameterContainer.querySelectorAll(".chip-options").forEach(option => {
            option.style.display = "none";
        });

        if (chipManufacturer === "Texas Instruments") {
            const fpdOptions = parameterContainer.querySelector(".fpd-options");
            if (fpdOptions) fpdOptions.style.display = "block";
        } else if (chipManufacturer === "APIX") {
            const apixOptions = parameterContainer.querySelector(".apix-options");
            if (apixOptions) apixOptions.style.display = "block";
        } else if (chipManufacturer === "Maxim") {
            const gmslOptions = parameterContainer.querySelector(".gmsl-options");
            if (gmslOptions) gmslOptions.style.display = "block";
        }

        const chipOptionButtons = parameterContainer.querySelectorAll(".chip-options .btn.option");
        if (chipOptionButtons.length > 0) {
            console.log("Chip option buttons found");
            chipOptionButtons.forEach(button => {
                button.addEventListener("click", function () {
                    console.log("Chip option button clicked");
                    button.parentElement.querySelectorAll(".btn.option").forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        } else {
            console.log("Chip option buttons NOT found!");
        }

        if (chipManufacturer === "Texas Instruments") {
            const backwardCompatibilityButtons = parameterContainer.querySelectorAll('.fpd-options .btn.option[data-value="Yes"],.fpd-options .btn.option[data-value="No"]');
            if (backwardCompatibilityButtons.length > 0) {
                backwardCompatibilityButtons.forEach(button => {
                    button.addEventListener("click", function () {
                        const parent = button.closest(".buttons");
                        parent.querySelectorAll(".btn.option").forEach(btn => btn.classList.remove("active"));
                        button.classList.add("active");

                        if (button.dataset.value === "Yes") {
                            console.log("backwards compatibility mode");
                        } else if (button.dataset.value === "No") {
                            console.log("");
                        }
                    });
                });
            }
        }
    }

    addInputOutputButton.addEventListener('click', addInputOutput);

    applyEventListeners(document);

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-video-parameter")) {
            const sectionToRemove = event.target.closest(".dynamic-input-output");
            if (sectionToRemove) {
                sectionToRemove.remove();
            }

            const remainingSections = document.querySelectorAll(".dynamic-input-output");

            remainingSections.forEach((section, index) => {
                const newNumber = index + 1;
                section.setAttribute("data-index", newNumber);

                const heading = section.querySelector("h2");
                if (heading) heading.textContent = `UUT Video IN/OUT ${newNumber}`;

                const removeButton = section.querySelector(".remove-video-parameter");
                if (removeButton) {
                    removeButton.setAttribute("data-index", newNumber);
                    removeButton.textContent = `Remove UUT Video IN/OUT ${newNumber}`;
                }
            });

            inputOutputCount = remainingSections.length;
        }
    });

    document.querySelectorAll('input[type="range"]').forEach(slider => {
        slider.addEventListener('input', function() {
            const display = document.getElementById(slider.id + 'Display');
            if (display) {
                display.textContent = slider.value;
            }
        });
        slider.dispatchEvent(new Event('input'));
    });

    document.querySelectorAll('.more-button').forEach(button => {
        button.addEventListener('click', function () {
            const targetId = button.getAttribute('data-target');
            const container = document.getElementById(targetId);
            if (container.innerHTML.trim() === "") {
                const numberInput = document.createElement('input');
                numberInput.type = 'number';
                numberInput.min = '1';
                numberInput.value = '1';
                numberInput.required = true;
                container.appendChild(numberInput);
            } else {
                container.innerHTML = "";
            }
        });
    });

    const plannedNumber = document.getElementById('plannedQuantityEditable');
    const plannedSlider = document.getElementById('plannedQuantity');
    const plannedDisplay = document.getElementById('plannedQuantityDisplay');

    plannedNumber.addEventListener('input', function() {
        plannedSlider.value = plannedNumber.value;
        plannedDisplay.textContent = plannedNumber.value;
    });
    plannedSlider.addEventListener('input', function() {
        plannedNumber.value = plannedSlider.value;
        plannedDisplay.textContent = plannedSlider.value;
    });

    document.querySelectorAll('.slider-wrapper').forEach(wrapper => {
        attachSliderSync(wrapper);
    });

    const infoIcons = document.querySelectorAll(".info-icon");
    infoIcons.forEach(icon => {
        icon.addEventListener("click", function (event) {
            event.stopPropagation();
            const tooltip = icon.nextElementSibling;
            if (tooltip && tooltip.classList.contains("tooltip") && tooltip.classList.contains("textbox")) {
                tooltip.classList.toggle("visible");
            }
        });
    });

    document.addEventListener("click", function () {
        document.querySelectorAll(".tooltip.textbox.visible").forEach(tooltip => {
            tooltip.classList.remove("visible");
        });
    });

    // Attach Slider Sync
    function attachSliderSync(wrapper) {
        const numberInput = wrapper.querySelector('input[type="number"]');
        const slider = wrapper.querySelector('input[type="range"]');
        const display = wrapper.querySelector('.slider-display');
        if (numberInput && slider && display) {
            display.textContent = numberInput.value;
            numberInput.addEventListener('input', function() {
                slider.value = numberInput.value;
                display.textContent = numberInput.value;
            });
            slider.addEventListener('input', function() {
                numberInput.value = slider.value;
                display.textContent = slider.value;
            });
        }
    }

    const hardwareFormatButtons = document.querySelectorAll(".hardware-format-options .btn-option");
    if (hardwareFormatButtons.length > 0) {
        console.log("Hardware format buttons found");
        hardwareFormatButtons.forEach(button => {
            button.addEventListener("click", function () {
                const parent = button.closest(".hardware-format-options");
                parent.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    } else {
        console.log("Hardware format buttons NOT found!");
    }

    const form = document.getElementById('videoProjectForm');

    // Highlight Errors
    function highlightErrors() {
        const form = document.getElementById('videoProjectForm');
        const inputs = form.querySelectorAll('input:required, select:required, textarea:required');
        const visibleInputs = Array.from(inputs).filter(input => input.offsetParent !== null);
        let firstErrorElement = null;

        visibleInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error-highlight');
                if (!firstErrorElement) {
                    firstErrorElement = input;
                }
            }
        });

        const buttons = form.querySelectorAll('.btn-option');
        buttons.forEach(button => {
            button.classList.remove('error-highlight');
        });

        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const label = checkbox.closest('label');
            if (label && !checkbox.checked) {
                label.classList.add('error-highlight');
                if (!firstErrorElement) {
                    firstErrorElement = label;
                }
            }
        });

        const buttonGroups = form.querySelectorAll(".btn-group, .sideband-group");
        buttonGroups.forEach(group => {
            const buttons = group.querySelectorAll(".btn-option");
            const isMultiChoice = group.classList.contains("sideband-group");

            if (isMultiChoice) {
                const anyActive = Array.from(buttons).some(button => button.classList.contains("active"));
                if (!anyActive) {
                    buttons.forEach(button => {
                        button.style.color = "red";
                    });
                    if (!firstErrorElement) {
                        firstErrorElement = group;
                    }
                }
            } else {
                const activeButton = group.querySelector(".btn-option.active");
                if (!activeButton) {
                    buttons.forEach(button => {
                        button.style.color = "red";
                    });
                    if (!firstErrorElement) {
                        firstErrorElement = group;
                    }
                }
            }
        });

        const hardwareFormatButtons = form.querySelectorAll(".hardware-format-options .btn-option");
        hardwareFormatButtons.forEach(button => {
            if (button.offsetParent !== null && !button.classList.contains("active")) {
                button.classList.add("error-highlight");
                if (!firstErrorElement) {
                    firstErrorElement = button;
                }
            }
        });

        const videoConnectorTypeBox = form.querySelector(".video-connector-type");
        if (videoConnectorTypeBox && videoConnectorTypeBox.offsetParent !== null) {
            const activeButton = videoConnectorTypeBox.querySelector(".btn.option.active");
            if (!activeButton) {
                videoConnectorTypeBox.classList.add("error-highlight");
                if (!firstErrorElement) {
                    firstErrorElement = videoConnectorTypeBox;
                }
            }
        }

        const videoConnectorButtons = form.querySelectorAll(".video-connector-type .btn.option");
        videoConnectorButtons.forEach(button => {
            if (button.offsetParent !== null && !button.classList.contains("active")) {
                button.classList.add("error-highlight");
                if (!firstErrorElement) {
                    firstErrorElement = button;
                }
            }
        });

        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Submit Form
    document.getElementById('submitForm').addEventListener('click', async function (e) {
        e.preventDefault();

        const inputs = form.querySelectorAll('input:required, select:required, textarea:required');
        const visibleInputs = Array.from(inputs).filter(input => input.offsetParent !== null);
        let hasErrors = false;

        visibleInputs.forEach(input => {
            if (!input.value.trim()) { 
                input.classList.add('error-highlight');
                hasErrors = true;
            }
        });
        if (hasErrors) {
            highlightErrors(); 
            return; 
        }
        const userConfirmed = confirm("Submitting form, are you sure?");
        if (!userConfirmed) {
            return; 
        }
        console.log("Submit button clicked");

        document.querySelectorAll('.error-highlight').forEach(el => el.classList.remove('error-highlight'));
        document.querySelectorAll('.error-text').forEach(el => el.remove());

        const chipManufacturer = document.querySelector('select[name="chipManufacturer[]"]')?.value;
        const sinkOrSource = document.querySelector('select[name="icType[]"]')?.value;
        const customerName = document.getElementById('customerName')?.value || '';
        const contactPerson = document.getElementById('contactPerson')?.value || '';
        const projectTitle = document.getElementById('projectTitle')?.value || '';
        const useCase = document.getElementById('useCase')?.value || '';
        const plannedQuantity = document.getElementById('plannedQuantityEditable')?.value || '';
        const formData = {
            chipManufacturer,
            sinkOrSource,
            customerName,
            contactPerson,
            projectTitle,
            useCase,
            plannedQuantity
        };

        console.log('Form Data:', formData);
        const additionalPdfPaths = [];
        await generatePDF(formData, additionalPdfPaths);
    });

    document.getElementById('submitForm').addEventListener('click', function () {
        const form = document.getElementById('videoProjectForm');

        const inputs = form.querySelectorAll('input:required, select:required, textarea:required');
        inputs.forEach(input => {
            if (input.value.trim()) {
                input.classList.remove('error-highlight');
            }
        });

        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const label = checkbox.closest('label');
            if (label && checkbox.checked) {
                label.classList.remove('error-highlight');
            }
        });

        const buttonGroups = form.querySelectorAll(".btn-group, .sideband-group");
        buttonGroups.forEach(group => {
            const buttons = group.querySelectorAll(".btn-option");
            const isMultiChoice = group.classList.contains("sideband-group");

            if (isMultiChoice) {
                const anyActive = Array.from(buttons).some(button => button.classList.contains("active"));
                if (anyActive) {
                    buttons.forEach(button => button.style.color = "");
                }
            } else {
                const activeButton = group.querySelector(".btn-option.active");
                if (activeButton) {
                    buttons.forEach(button => button.style.color = "");
                }
            }
        });
    });

    const buttonGroups = form.querySelectorAll(".btn-group, .sideband-group");
    buttonGroups.forEach(group => {
        const buttons = group.querySelectorAll(".btn-option");
        const isMultiChoice = group.classList.contains("sideband-group");

        buttons.forEach(button => {
            button.addEventListener('click', function () {
                if (isMultiChoice) {
                    const anyActive = Array.from(buttons).some(btn => btn.classList.contains("active"));
                    if (anyActive) {
                        group.querySelectorAll(".btn-option").forEach(btn => btn.style.color = "");
                    }
                } else {
                    group.querySelectorAll(".btn-option").forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    group.querySelectorAll(".btn-option").forEach(btn => btn.style.color = "");
                }
            });
        });
    });

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const label = checkbox.closest('label');
            if (label && checkbox.checked) {
                label.classList.remove('error-highlight');
            }
        });
    });

    const inputs = form.querySelectorAll('input:required, select:required, textarea:required');
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (input.value.trim()) {
                input.classList.remove('error-highlight');
            }
        });
    });
});