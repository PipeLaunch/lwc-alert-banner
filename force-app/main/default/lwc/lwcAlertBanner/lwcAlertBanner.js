/**
 * @description       : SLDS Alert Banner Generic Component
 *                      NOTE: styles doesn't work on local dev environment
 * @group             : Generic Components
 * @author            : samuel@pipelaunch.com
 * @last modified on  : 22-08-2022
 * @last modified by  : samuel@pipelaunch.com
 * @changelog         : 23-07-2022 - Initial version
 **/
import { LightningElement, api, track } from "lwc";

import * as utils from "./lwcAlertBannerUtils";

export default class LwcAlertBanner extends LightningElement {
  @api link = null;
  @api linkMessage = null;
  @api buttonAction = null; // function
  @api closeButtonAction = null; // function

  /**
   * @description main message to display before the icon
   * @default ""
   */
  @api
  get message() {
    return this._message;
  }
  _message = "";
  set message(value) {
    this._message = utils.validateString(value);
  }

  @api
  get iconName() {
    return this._iconName;
  }
  _iconName = null;
  set iconName(value) {
    this._iconName = utils.validateIconName(value);
  }

  /**
   * @description Propagate events up with bubble and composed to use when the component
   * is nested
   * @default false
   */
  @api get propagateEvents() {
    return this._propagateEvents;
  }
  _propagateEvents = false;
  set propagateEvents(value) {
    this._propagateEvents = utils.normalizeBoolean(value);
  }

  /**
   * @description type of the state. Valid values are: base,warning, error, offline
   * @default "base"
   */
  @api
  get type() {
    return this._type;
  }
  _type = "base";
  set type(value) {
    this._type = utils.validateType(value);
  }

  /**
   * @description hide the banner when user clicks close
   */
  @api
  get hideOnClose() {
    return this._hideOnClose;
  }
  _hideOnClose = false;
  set hideOnClose(value) {
    this._hideOnClose = utils.normalizeBoolean(value);
  }

  /**
   * @description target of the html link
   * @default _self
   */
  @api
  get target() {
    return this._target;
  }
  _target = "_self"; // _blank
  set target(value) {
    this._target = utils.validateTarget(value);
  }

  // to control the status of the component
  @track status = {
    show: true,
  };

  /**
   * @type {String}
   */
  get computeIconName() {
    return utils.computeIconName(this._type, this._iconName);
  }

  /**
   * @type {String}
   */
  get computeIconAlternativeText() {
    return utils.computeIconAlternativeText(this._type);
  }

  /**
   * @type {String}
   */
  get computeClasses() {
    return utils.computeClasses(this._type);
  }

  /**
   * @type {String}
   */
  get computeIconVariant() {
    return utils.computeIconVariant(this._type);
  }

  /**
   * @description handle slot content change
   * @param {*} evt
   */
  handleSlotChange(evt) {
    this._hasSlot = utils.hasSlotContent(evt);
  }

  /**
   * @description execute a function if user clicks on the link
   */
  handleClickButton(evt) {
    if (typeof this.buttonAction === "function") {
      evt.preventDefault(); // don't follow link
      this.buttonAction();
    }
  }

  handleClickButtonClose() {
    if (this._hideOnClose) {
      this.status.show = false;
    }

    if (typeof this.closeButtonAction === "function") {
      this.closeButtonAction();
    }

    this._dispatchEvent("close");
  }


  /**
   * @description dispatch an event to the parent
   * @param {String} eventName 
   */
  _dispatchEvent(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        composed: this.propagateEvents,
        bubbles: this.propagateEvents,
      })
    );
  }
}
