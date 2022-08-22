/**
 * @description       : Sample usage of the custom component
 * @group             : Generic Components
 * @author            : samuel@pipelaunch.com
 * @last modified on  : 22-08-2022
 * @last modified by  : samuel@pipelaunch.com
**/
import { LightningElement } from "lwc";

// import LightningAlert from "lightning/alert"; // disabled to support local dev
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Samples extends LightningElement {
  buttonAction = () => {
    console.log("dispatch toast event");
    const event = new ShowToastEvent({
      title: "Success",
      message: "This is a success message",
      variant: "success",
    });
    this.dispatchEvent(event);
  }

  handleClose() {
    console.log("close event");
    const event = new ShowToastEvent({
      title: "Success",
      message: "Alert banner close button clicked"
    });
    this.dispatchEvent(event);
  }
}
