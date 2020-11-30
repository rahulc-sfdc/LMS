import { LightningElement, track, wire } from "lwc";
import { createMessageContext, APPLICATION_SCOPE, subscribe, MessageContext } from "lightning/messageService";
import DemoMC from "@salesforce/messageChannel/DemoMessageChannel__c";
import NAME_FIELD from "@salesforce/schema/Contact.Name";
import ACCOUNT_FIELD from "@salesforce/schema/Contact.AccountId";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import MOBILE_FIELD from "@salesforce/schema/Contact.MobilePhone";

export default class DemoSubscriber extends LightningElement {
  // get MessageContext using createMessageContext()
  //context = createMessageContext();

  // get MessageContext using wire adapter
  @wire(MessageContext) messageContext;
  subscription = null;
  receivedMessage = "";
  contactId;
  objectApiName = "Contact";
  fields = [NAME_FIELD, ACCOUNT_FIELD, EMAIL_FIELD, MOBILE_FIELD];

  connectedCallback() {
    this.subscribeLWC();
  }

  subscribeLWC() {
    if (this.subscription) {
      return;
    }
    this.subscription = subscribe(
      this.messageContext,
      DemoMC,
      (message) => {
        this.handleCall(message);
      },
      { scope: APPLICATION_SCOPE }
    );
  }

  handleCall(message) {
    this.contactId = message.recordId;
    this.receivedMessage = message ? message.recordData.value : "no message";
  }
}
